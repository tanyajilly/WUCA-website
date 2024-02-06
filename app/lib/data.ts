'use server';
import { fetcher } from '@/app/lib/api';
import { PAGE_SIZE } from "@/app/lib/constants";

export async function getArticles(articleType: string, page: number = 1, pageSize: number = PAGE_SIZE) {
    if (!['articles', 'events', 'facts'].includes(articleType)) {
        throw new Error('Invalid articleType');
    }
    
    try {
        const params = new URLSearchParams();
        params.append('populate[basicArticleData][populate][0]', 'image');
        params.append('populate[basicArticleData][populate][1]', 'author');
        params.append('pagination[page]', page.toString());
        params.append('pagination[pageSize]', pageSize.toString());
        params.append('sort', 'publishedAt:desc');
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/${articleType}?${queryString}`;
        console.log(url);
        const articlesResponse = await fetcher(url);
        console.log(articlesResponse);
        return articlesResponse;
    }
    catch(error) {
        throw error;
    }
}

export async function getArticleBySlug(slug: string, articleType: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/${articleType}/${slug}`;
        const articleResponse = await fetcher(url, { cache: 'no-store' });
        return articleResponse;
    }
    catch(error) {
        throw error;
    }
}

export async function getPageBySlug(slug: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/pages/${slug}`;
        const pageResponse = await fetcher(url, { cache: 'no-store' });
        return pageResponse;
    }
    catch(error) {
        throw error;
    }
}

export async function getHomepageContent() {
    try {
        const params = new URLSearchParams();
        params.append('populate[0]', 'carousel.photo.image');
        params.append('populate[1]', 'about.image');
        params.append('populate[2]', 'fact.image');
        params.append('populate[3]', 'warInfo.image');
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/homepage?${queryString}`;
        const pageResponse = await fetcher(url, { cache: 'no-store' });
        return pageResponse;
    }
    catch(error) {
        throw error;
    }
}

export async function getHelpPageContent() {
    try {
        const params = new URLSearchParams();
        params.append('populate', '*');
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/help?${queryString}`;
        const pageResponse = await fetcher(url, { cache: 'no-store' });
        return pageResponse;
    }
    catch(error) {
        throw error;
    }
}

export async function getMainNav() {
    try {
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/navigation/render/main-navigation?type=TREE`;
        const navResponse = await fetcher(url, { cache: 'no-store' });
        return navResponse;
    }
    catch(error) {
        throw error;
    }
}
