import Link from 'next/link';
import { Event } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import CustomImage from './custom-image';

export default function EventPreview({ event }: { event: Event }) {
    const {
        title,
        description,
        image,
        slug,
        startDate,
        location
    } = event.attributes;

    const { width, height, url } = image?.data?.attributes?.formats?.small || {};

    return (
        <article className="p-4 border border-gray-200 rounded-xl">
            <div className="aspect-video rounded-md overflow-hidden mb-4">
                <Link href={`/events/${slug}`}>
                    <CustomImage
                        url={url}
                        title={title}
                        width={width}
                        height={height}
                        className="object-cover h-full w-full"
                    />
                </Link>
            </div>
            <div className="p-2">
                <h2 className="text-2xl leading-5 font-semibold mb-2">
                    <Link className="text-current" href={`/events/${slug}`}>{title}</Link>
                </h2>
                <p className="text-gray-600 font-medium ">{formatDateToLocal(startDate)}</p>
                <p className="text-gray-600 font-medium ">{location}</p>
                <p className="text-gray-500 text-sm">{description}</p>
            </div>
        </article>
    )
}