import Events from "@/app/ui/event-listing";
import { getArticles } from "@/app/lib/data";
import { EventsResponse } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import Calendar from "@/app/ui/full-calendar";

type EventsPageProps = {
    params: {
        locale: string;
    };
};

export const metadata: Metadata = {
	title: 'Events',
	description: 'Upcoming events by WUCA and partners',
}
export default async function EventsPage({ params }: EventsPageProps) {
    const { locale } = params;
    const events: EventsResponse = await getArticles('events', locale, 1);
    if (!events.data || events.data.length === 0) {
        notFound();
    }
    return (
        <>
            <Calendar eventsList={events} locale={locale} />
            <div className="h-8"></div>
            <Events events={events} isPagination={true} locale={locale} />
        </>
    )
    
}
