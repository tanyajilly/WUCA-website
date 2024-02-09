import Link from 'next/link';
import CustomImage from '@/app/ui/custom-image';
import { Article } from '@/app/lib/definitions';

export default function PostPreviewSmall({ article }: {article: Article}) {
    const {
        title,
        description,
        image,
        slug
    } = article.attributes;
    const { width, height, url } = image?.data?.attributes?.formats?.thumbnail || {};
    
    return (
        <article className="">
            <div className="aspect-square rounded-md overflow-hidden mb-4">
                <Link href={`/news/${slug}`}>
                    <CustomImage
                        url={url}
                        title={title}
                        width={width}
                        height={height}
                        className="object-cover w-full h-full"
                    />
                </Link>
            </div>
            <h3 className="text-lg"><Link href={`/news/${slug}`}>{title}</Link></h3>
            <p>{description}</p>
        </article>
    )
}