import Events from "@/app/ui/event-listing";
import { getEvents } from "@/app/lib/data";
import { EventsResponse } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import { PAGE_SIZE } from "@/app/lib/constants";

export default async function Home() {
    const pageSize = PAGE_SIZE;
    const events: EventsResponse = await getEvents(1, pageSize);
    if (!events.data) {
        notFound();
    }
    return <Events events={events} isPagination={true} pageSize={pageSize} />;
}
