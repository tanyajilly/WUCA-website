"use server";
import { fetcher } from "@/app/lib/api";
import { PAGE_SIZE } from "@/app/lib/constants";
import type { Article } from "@/app/lib/definitions";
export async function getArticles(
    articleType: string,
    locale: string,
    page: number = 1,
    pageSize: number = PAGE_SIZE,
    category?: string
) {
    if (!["articles", "events", "facts"].includes(articleType)) {
        throw new Error("Invalid articleType");
    }

    try {
        const params = new URLSearchParams();
        params.append("populate[0]", "image");
        params.append("populate[1]", "author");
        params.append("pagination[page]", page.toString());
        params.append("pagination[pageSize]", pageSize.toString());
        params.append("sort", "publishedAt:desc");
        params.append("locale", locale);
        // upcoming events, exclude repeatable
        if (articleType === "events") {
            const today = new Date().toISOString().split("T")[0];
            params.append("filters[$and][0][startDate][$gte]", today);
            params.append("filters[$and][1][isRepeatable][$eq]", "false");
        }
        // category filter
        if (category) {
            params.append("filters[categories][slug][$eq]", category);
        }
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/${articleType}?${queryString}`;
        const articlesResponse = await fetcher(url, { cache: "no-store" });
        return articlesResponse;
    } catch (error) {
        throw error;
    }
}

export async function getArticleBySlug(
    slug: string,
    articleType: string,
    locale: string
) {
    try {
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/${articleType}/${slug}?locale=${locale}`;
        const articleResponse = await fetcher(url, { cache: "no-store" });
        return articleResponse;
    } catch (error) {
        throw error;
    }
}

export async function getPageBySlug(slug: string, locale?: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/pages/${slug}?locale=${locale}`;
        const pageResponse = await fetcher(url);
        return pageResponse;
    } catch (error) {
        throw error;
    }
}

export async function getHomepageContent(locale: string) {
    try {
        const params = new URLSearchParams();
        params.append("populate[0]", "carousel.photo.image");
        params.append("populate[1]", "about.image");
        params.append("populate[2]", "fact.image");
        params.append("populate[3]", "warInfo.image");
        params.append("populate[4]", "about.Button");
        params.append("locale", locale);
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/homepage?${queryString}`;
        const pageResponse = await fetcher(url);
        return pageResponse;
    } catch (error) {
        throw error;
    }
}

export async function getHelpPageContent(locale: string) {
    try {
        const params = new URLSearchParams();
        params.append("populate", "*");
        params.append("locale", locale);
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/helps/?${queryString}`;
        const pageResponse = await fetcher(url);
        return pageResponse;
    } catch (error) {
        throw error;
    }
}

export async function getMainNav(locale: string) {
    try {
        const params = new URLSearchParams();
        params.append("type", "TREE");
        params.append("locale", locale);
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/navigation/render/main-navigation?${queryString}`;
        const navResponse = await fetcher(url);
        return navResponse;
    } catch (error) {
        throw error;
    }
}

export async function fetchAllContentByCategory(
    category: string,
    locale: string
) {
    const [articles, facts, categoryName] = await Promise.all([
        getArticles("articles", locale, 1, 100, category),
        getArticles("facts", locale, 1, 100, category),
        getCategoryNameBySlug(category),
    ]);

    // Add articleType key to each object
    const articlesWithType = articles.data.map((article: Article) => ({
        ...article,
        articleType: "news",
    }));
    const factsWithType = facts.data.map((fact: Article) => ({
        ...fact,
        articleType: "facts",
    }));

    // Combine the results
    const combinedResults = [...articlesWithType, ...factsWithType];

    // Sort combined results by publication date in descending order
    combinedResults.sort(
        (a, b) =>
            new Date(b.attributes.publishedAt).getTime() -
            new Date(a.attributes.publishedAt).getTime()
    );

    return {
        results: combinedResults,
        category: categoryName,
    };
}

export async function getCategoryNameBySlug(slug: string) {
    try {
        const params = new URLSearchParams();
        params.append("filters[slug][$eq]", slug);
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/categories?${queryString}`;
        const catResponse = await fetcher(url);
        return catResponse.data[0].attributes.name;
    } catch (error) {
        throw error;
    }
}
