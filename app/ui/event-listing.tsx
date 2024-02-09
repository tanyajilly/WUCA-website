'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { EventsResponse, Event } from '@/app/lib/definitions';
import Pagination from '@/app/ui/pagination';
import EventPreview from '@/app/ui/event-preview';
import { fetcher } from '@/app/lib/api';
import { PAGE_SIZE } from '@/app/lib/constants';

type EventsProps = {
    events: EventsResponse,
    isPagination?: boolean, 
    pageSize?: number
    locale: string;
};

export default function Events(
    { events, locale, isPagination, pageSize = PAGE_SIZE }: EventsProps) {

    const [pageIndex, setPageIndex] = useState(1);
    const url = new URL(`${process.env.NEXT_PUBLIC_STRAPI_URL}/events`);
    const params = new URLSearchParams();
    params.append('populate[0]', 'image');
    params.append('pagination[page]', pageIndex.toString());
    params.append('pagination[pageSize]', pageSize.toString());
    params.append('sort', 'startDate:desc');
    params.append("locale", locale);
    url.search = params.toString();

    const { data, error } = useSWR(url.toString(), fetcher, {
        fallbackData: events
    });
    if (error) {
        return <p>Failed to fetch</p>;
    }
    return (
        <>
            <section className="flex flex-col gap-10">
                {data && data.data.map((event: Event) => <EventPreview key={event.id} event={event}  />)}
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