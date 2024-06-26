"use client";

import useSWR from "swr";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { EventsResponse, Event } from "@/app/lib/definitions";
import Pagination from "@/app/ui/pagination";
import EventPreview from "@/app/ui/event-preview";
import { fetcher } from "@/app/lib/api";
import { PAGE_SIZE } from "@/app/lib/constants";

type EventsProps = {
    events: EventsResponse;
    isPagination?: boolean;
    pageSize?: number;
    locale: string;
};

export default function Events({
    events,
    locale,
    isPagination,
    pageSize = PAGE_SIZE,
}: EventsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pageIndex = parseInt(searchParams.get("page") || "1", 10);
    const url = new URL(`${process.env.NEXT_PUBLIC_STRAPI_URL}/events`);
    const params = new URLSearchParams();
    params.append("populate[0]", "image");
    params.append("pagination[page]", pageIndex.toString());
    params.append("pagination[pageSize]", pageSize.toString());
    params.append("sort", "startDate:desc");
    params.append("locale", locale);
    // Filter for upcoming events excluding repeatable
    const today = new Date().toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    params.append("filters[$and][0][startDate][$gte]", today);
    params.append("filters[$and][1][isRepeatable][$eq]", 'false');
    url.search = params.toString();

    const setPageIndex = (newPageIndex: number) => {
        router.push(`${pathname}?page=${newPageIndex}`);
    };

    const { data, error } = useSWR(url.toString(), fetcher, {
        fallbackData: events,
    });
    if (error) {
        return <p>Failed to fetch</p>
    }
    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {data &&
                    data.data.map((event: Event) => (
                        <EventPreview key={event.id} event={event} />
                    ))}
            </section>
            {isPagination && data && (
                <Pagination
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pageCount={data.meta.pagination.pageCount}
                />
            )}
        </>
    );
}
