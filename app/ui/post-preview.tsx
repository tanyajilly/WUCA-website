import Link from 'next/link';
import Image from 'next/image'
import { Article } from '@/app/lib/definitions';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default function PostPreview({ article }: {article: Article}) {
    const { heading, content, image, slug } = article.attributes;
    const { width, height, url } = image?.data?.attributes?.formats?.small || {};
    
    return (
        <article className="flex gap-6 w-full">
            <div className="w-1/5 shrink-0 aspect-square rounded-md overflow-hidden">
                <Link href={`/blog/${slug}`}>
                    {url && <Image
                        src={url}
                        alt={heading}
                        width={width}
                        height={height}
                        className="object-cover h-full"
                    />}
                </Link>
            </div>
            <div>
                <h2 className="text-lg"><Link href={`/blog/${slug}`}>{heading}</Link></h2>
                <BlocksRenderer content={content} />
            </div>
        </article>
    )
}