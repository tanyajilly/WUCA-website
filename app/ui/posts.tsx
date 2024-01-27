'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { ArticlesResponse, Article } from '@/app/lib/definitions';
import Pagination from '@/app/ui/pagination';
import PostPreview from '@/app/ui/post-preview';
import { fetcher } from '@/app/lib/api';
import { PAGE_SIZE } from '@/app/lib/constants';

export default function Posts(
    { articles, isPagination, pageSize = PAGE_SIZE }:
    {
        articles: ArticlesResponse,
        isPagination?: boolean,
        pageSize?: number
    }) {

    const [pageIndex, setPageIndex] = useState(1);
    const url = new URL(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles`);
    const params = new URLSearchParams();
    params.append('populate', 'image');
    params.append('pagination[page]', pageIndex.toString());
    params.append('pagination[pageSize]', pageSize.toString());
    url.search = params.toString();

    const { data, error } = useSWR(url.toString(), fetcher, {
        fallbackData: articles
    });
    if (error) {
        return <p>Failed to fetch</p>;
    }

    return (
        <>
            <section className="flex flex-col gap-10">
                {data && data.data.map((article: Article) => <PostPreview key={article.id} article={article}  />)}
            </ section>
            {isPagination && data && (
                <Pagination
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pageCount={data.meta.pagination.pageCount}
                />
            )}
        </>
    )
}