import Link from 'next/link';
import Image from 'next/image'
import { Event } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default function EventPreview({ event }: {event: Event}) {
    const {
        basicArticleData,
        slug,
        startDate,
        endDate,
        location
    } = event.attributes;
    const {
        title,
        description,
        image
    } = basicArticleData;
    const { width, height, url } = image?.data?.attributes?.formats?.small || {};
    
    return (
        <article className="flex gap-6 w-full">
            <div className="w-1/5 shrink-0 aspect-square rounded-md overflow-hidden">
                <Link href={`/events/${slug}`}>
                    {url && <Image
                        src={url}
                        alt={title}
                        width={width}
                        height={height}
                        className="object-cover h-full"
                    />}
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