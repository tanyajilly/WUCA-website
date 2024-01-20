import Image from 'next/image'
import { Article } from '@/app/lib/definitions';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Comments from './comments';

export default function Post ({ article }: { article: Article }) {
    const { 
        heading,
        content,
        image,
        comments
    } = article.attributes;
    const { width, height, url } = image?.data?.attributes || {};
    const articleData = {
        id: article.id,
        slug: article.attributes.slug
    }

    return (
        <article className="">
            <div className="w-full rounded-md overflow-hidden">
                {url && <Image
                    src={url}
                    alt={heading}
                    width={width}
                    height={height}
                    className="w-full object-cover aspect-video"
                />}
            </div>
            <div>
                <h1 className="text-2xl">{heading}</h1>
                <BlocksRenderer content={content} />
            </div>
            {comments && <Comments
                comments={comments}
                articleData={articleData}
            />}
        </article>
    )
}