import Events from "@/app/ui/event-listing";
import { getArticles } from "@/app/lib/data";
import { EventsResponse } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import Calendar from "@/app/ui/full-calendar";
import initTranslations from "@/app/i18n";

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
    const { t } = await initTranslations(locale, ["home"]);
    const events: EventsResponse = await getArticles('events', locale, 1);
    if (!events.data || events.data.length === 0) {
        notFound();
    }
    return (
        <>
            <h1 className="text-3xl font-semibold mb-4 text-center">{t("upcoming_events")}</h1>
            <Calendar eventsList={events} locale={locale} />
            <div className="h-8"></div>
            <Events events={events} isPagination={true} locale={locale} />
        </>
    )

}
