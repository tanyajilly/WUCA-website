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
    const { data } = useSWR(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?populate=image&pagination[page]=${pageIndex}&pagination[pageSize]=${pageSize}`,
        fetcher,
        {
            fallbackData: articles
        }
    );
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