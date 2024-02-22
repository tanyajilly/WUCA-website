"use server";
import { fetcher } from "@/app/lib/api";
import { PAGE_SIZE } from "@/app/lib/constants";

export async function getArticles(
    articleType: string,
    locale: string,
    page: number = 1,
    pageSize: number = PAGE_SIZE
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
        if (articleType === 'events') {
            const today = new Date().toISOString().split('T')[0];
            params.append("filters[$and][0][startDate][$gte]", today);
            params.append("filters[$and][1][isRepeatable][$eq]", 'false');
        }
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/${articleType}?${queryString}`;
        const articlesResponse = await fetcher(url);
        return articlesResponse;
    } catch (error) {
        throw error;
    }
}

export async function getArticleBySlug(slug: string, articleType: string, locale: string) {
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
        const pageResponse = await fetcher(url, { cache: "no-store" });
        return pageResponse;
    } catch (error) {
        throw error;
    }
}

export async function getHomepageContent(locale: string) {
    const pageName = locale === 'uk' ? 'homepage-ua' : 'homepage';
    try {
        const params = new URLSearchParams();
        params.append("populate[0]", "carousel.photo.image");
        params.append("populate[1]", "about.image");
        params.append("populate[2]", "fact.image");
        params.append("populate[3]", "warInfo.image");
        params.append("populate[4]", "about.Button");
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/${pageName}?${queryString}`;
        const pageResponse = await fetcher(url, { cache: "no-store" });
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
        const pageResponse = await fetcher(url, { cache: "no-store" });
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
        const navResponse = await fetcher(url, { cache: "no-store" });
        return navResponse;
    } catch (error) {
        throw error;
    }
}
