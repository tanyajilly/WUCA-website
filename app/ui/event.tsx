import Image from 'next/image';
import { Event } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { getContentComponent } from '@/app/lib/renderDynamicZone';

export default function Event ({ event }: { event: Event }) {
    const {
        basicArticleData,
        pageContent,
        startDate,
        endDate,
        location
    } = event.attributes;
    const {
        title,
        image,
    } = basicArticleData;
    const { width, height, url } = image?.data?.attributes || {};
    return (
        <article className="">
            <div className="mb-4">
                <h1 className="text-2xl">{title}</h1>
                <div className="article-info">
                    <p>{formatDateToLocal(startDate)} - {formatDateToLocal(endDate)}</p>
                    <p>{location}</p>
                </div>
            </div>
            
            <div className="w-full rounded-md overflow-hidden mb-4">
                {url && <Image
                    src={url}
                    alt={title}
                    width={width}
                    height={height}
                    className="w-full object-cover aspect-video"
                />}
            </div>
            { pageContent.map(getContentComponent) }
        </article>
    )
}