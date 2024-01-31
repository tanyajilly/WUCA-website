'use server';
import { fetcher } from '@/app/lib/api';

export async function getArticles(page: number = 1, pageSize: number = 3) {
    try {
        const params = new URLSearchParams();
        params.append('populate[BasicArticleData][populate][0]', 'Image');
        params.append('populate[BasicArticleData][populate][1]', 'author');
        params.append('pagination[page]', page.toString());
        params.append('pagination[pageSize]', pageSize.toString());
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?${queryString}`;
        const articlesResponse = await fetcher(url);
        
        return articlesResponse;
    }
    catch(error) {
        throw error;
    }
}

export async function getArticleBySlug(slug: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/${slug}`;
        const articleResponse = await fetcher(url, { cache: 'no-store' });
        return articleResponse;
    }
    catch(error) {
        throw error;
    }
}

export async function getMainNav() {
    try {
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/navigation/render/main-navigation?type=TREE`;
        const navResponse = await fetcher(url);
        return navResponse;
    }
    catch(error) {
        throw error;
    }
}
