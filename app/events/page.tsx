import Events from "@/app/ui/event-listing";
import { getArticles } from "@/app/lib/data";
import { EventsResponse } from "@/app/lib/definitions";
import { notFound } from "next/navigation";

export default async function EventsPage() {
    const events: EventsResponse = await getArticles('events', 1);
    if (!events.data) {
        notFound();
    }
    return <Events events={events} isPagination={true} />;
}
