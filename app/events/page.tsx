import Events from "@/app/ui/event-listing";
import { getEvents } from "@/app/lib/data";
import { EventsResponse } from "@/app/lib/definitions";
import { notFound } from "next/navigation";

export default async function EventsPage() {
    const events: EventsResponse = await getEvents(1);
    if (!events.data) {
        notFound();
    }
    return <Events events={events} isPagination={true} />;
}
