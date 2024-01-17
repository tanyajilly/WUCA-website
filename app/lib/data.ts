'use server';
import { fetcher } from '@/app/lib/api';
import { cookies } from 'next/headers';

export async function getArticles(page: number = 1, pageSize: number = 3) {
    try {
        const articlesResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?populate=image&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
        return articlesResponse;
    }
    catch(error) {
        console.log(error);
    }
}

export async function getArticleBySlug(slug: string) {
    try {
        const jwt = cookies().get('jwt')?.value;
        const articleResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/${slug}`,
            jwt
                ? {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                    }
                : ''
            );
        return articleResponse;
    }
    catch(error) {
        console.log(error);
    }
}

export async function getCurrentUserData() {
    const jwt = cookies().get('jwt');
    if (jwt?.value) {
      return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt.value}`,
        },
      });
    } else {
      return;
    }
  }