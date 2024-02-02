import Image from 'next/image'
import Link from 'next/link';
import { Article } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { getContentComponent } from '@/app/lib/renderDynamicZone';

export default function Post ({ article }: { article: Article }) {
    const { basicArticleData, publishedAt, pageContent, categories } = article.attributes;
    const {
        title,
        image,
        author
    } = basicArticleData;
    const { width, height, url } = image?.data?.attributes || {};
    return (
        <article className="">
            <div className="mb-4">
                <h1 className="text-2xl">{title}</h1>
                <div className="article-info">
                    {formatDateToLocal(publishedAt)} {author?.data && `by ${author.data.attributes.name}`}
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
            <div>
                { pageContent.map(getContentComponent) }
                
                {categories?.data && categories.data.length > 0 && <>
                    <h2>Categories:</h2>
                    <ul>
                        {categories.data.map(cat =>
                            <li key={cat.id}><Link href={`/blog/category/${cat.attributes.slug}`}>{cat.attributes.name}</Link></li>
                        )}
                    </ul>
                    
                </>}
            </div>
        </article>
    )
}