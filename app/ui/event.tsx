import Image from "next/image";
import ShareButtons from "./share-buttons";
import { Event } from "@/app/lib/definitions";
import { formatDateToLocal, formatTimeToLocal } from "@/app/lib/utils";
import { getContentComponent } from "@/app/lib/renderDynamicZone";
import initTranslations from "@/app/i18n";

type EventProps = {
    event: Event;
    locale: string;
};

export default async function Event({ event, locale }: EventProps) {
    const {
        title,
        image,
        pageContent,
        startDate,
        startTime,
        endTime,
        location,
        description,
        isRepeatable,
        repeatFrequency,
        dayOfWeek
    } = event.attributes;
    const { width, height, url } = image?.data?.attributes || {};
    
    console.log(event);
    let date: string;
    if (isRepeatable) {
        const { t } = await initTranslations(locale, ["date"]);
        date = t(repeatFrequency) + ' ' + t(dayOfWeek);
    } else {
        date = formatDateToLocal(startDate);
    }
    return (
        <article className="">
            <div className="mb-4">
                <h1 className="text-2xl mb-4">{title}</h1>
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
                        {date}
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
                        {startTime ? formatTimeToLocal(startTime) : ""}
                        {endTime ? " - " + formatTimeToLocal(endTime) : ""}
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
                        {location}
                    </li>
                </ul>
            </div>

            <div className="w-full rounded-md overflow-hidden mb-4">
                {url && (
                    <Image
                        src={url}
                        alt={title}
                        width={width}
                        height={height}
                        className="w-full object-cover aspect-video"
                    />
                )}
            </div>
            {pageContent.map(getContentComponent)}
            <div className="mt-4">
                <ShareButtons title={title} text={description} />
            </div>
        </article>
    );
}
