"use client";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import ukLocale from '@fullcalendar/core/locales/uk';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Event, EventsResponse } from "@/app/lib/definitions";
import { EventInput } from "@fullcalendar/core";
import { formatDateToLocal, formatTimeToLocal } from "@/app/lib/utils";
import Link from "next/link";

type CalendarProps = {
    eventsList: EventsResponse;
    locale: string;
};

type CalendarModalProps = {
    event: EventInput;
    onClose: () => void;
};

export default function Calendar({ eventsList, locale }: CalendarProps) {
    const [selectedEvent, setSelectedEvent] = useState<EventInput>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const calendarLocale = locale === 'uk' ? ukLocale : undefined;

    const handleEventClick = (clickInfo: any) => {
        clickInfo.jsEvent.preventDefault();
        setSelectedEvent(clickInfo.event);
        setIsModalOpen(true);
    };

    const events = eventsList.data?.map((el: Event) => {
        const {
            title,
            description,
            startDate,
            startTime,
            endTime,
            slug,
            location,
        } = el.attributes;

        return {
            title: title,
            start: startDate,
            url: slug,
            display: "block",
            extendedProps: {
                description,
                startTime,
                endTime,
                location,
            },
        };
    });

    return (
        <div className="relative">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                eventClick={handleEventClick}
                initialView="dayGridMonth"
                events={events}
                locale={calendarLocale}
            />
            {isModalOpen && selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

function EventModal({ event, onClose }: CalendarModalProps) {
    const startDate = formatDateToLocal(event.start as string);
    const startTime = formatTimeToLocal(event.extendedProps?.startTime);
    const endTime = formatTimeToLocal(event.extendedProps?.endTime);
    return (
        <div className="absolute inset-0 bg-black-overlay flex items-center justify-center z-10">
            <div className="relative bg-white text-gray-600 p-5 rounded w-[300px]">
                <h2>{event.title}</h2>
                <ul className="*:flex *:gap-2 space-y-2">
                    <li>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                            />
                        </svg>

                        {formatDateToLocal(startDate)}
                    </li>
                    <li>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        {startTime}{" "}
                        {endTime ? " - " + endTime : ""}
                    </li>
                    <li>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                        </svg>
                        {event.extendedProps?.location}
                    </li>
                </ul>
                <p>{event.extendedProps?.description}</p>
                <Link href={`/events/${event.url}`}>More</Link>
                <button className="absolute top-0 right-0" onClick={onClose}>
                    <svg
                        className="h-8 w-8 text-slate-700"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <line x1="18" y1="6" x2="6" y2="18" />{" "}
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
