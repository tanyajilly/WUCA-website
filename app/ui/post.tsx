import Image from 'next/image'
import Link from 'next/link';
import { Article } from '@/app/lib/definitions';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Comments from './comments';
import { formatDateToLocal } from '@/app/lib/utils';

export default function Post ({ article }: { article: Article }) {
    const { 
        heading,
        content,
        image,
        comments,
        categories,
        publishedAt,
        author
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
                <div className="article-info">
                    {formatDateToLocal(publishedAt)} {author?.data && `by ${author.data.attributes.name}`}
                </div>
                <BlocksRenderer content={content} />
                {categories?.data && categories.data.length > 0 && <>
                    <h2>Categories:</h2>
                    <ul>
                        {categories.data.map(cat =>
                            <li key={cat.id}><Link href={`/blog/category/${cat.attributes.slug}`}>{cat.attributes.name}</Link></li>
                        )}
                    </ul>
                    
                </>}
            </div>
            {comments && <Comments
                comments={comments}
                articleData={articleData}
            />}
        </article>
    )
}