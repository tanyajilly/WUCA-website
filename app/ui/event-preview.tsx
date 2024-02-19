import Link from 'next/link';
import { Event } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import CustomImage from './custom-image';

export default function EventPreview({ event }: {event: Event}) {
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
        <article className="flex gap-6 w-full items=start">
            <div className="w-1/5 min-w-24 shrink-0 aspect-square rounded-md overflow-hidden">
                <Link href={`/events/${slug}`}>
                    <CustomImage
                        url={url}
                        title={title}
                        width={width}
                        height={height}
                        className="object-cover h-full"
                    />
                </Link>
            </div>
            <div>
                <h2 className="text-lg"><Link href={`/events/${slug}`}>{title}</Link></h2>
                <p>{formatDateToLocal(startDate)}</p>
                <p>{location}</p>
                <p>{description}</p>
            </div>
        </article>
    )
}