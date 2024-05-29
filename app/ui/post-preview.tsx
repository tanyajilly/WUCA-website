import Link from "next/link";
import CustomImage from '@/app/ui/custom-image';
import { Article } from "@/app/lib/definitions";

type PostsPreviewProps = {
    article: Article;
    articleType: "articles" | "facts";
};

export default function PostPreview({
    article,
    articleType,
}: PostsPreviewProps) {
    const enhancedArticleType =
        articleType === "articles" ? "news" : articleType;
    const { title, description, image, slug } = article.attributes;
    const { width, height, url } =
        image?.data?.attributes?.formats?.small || {};

    return (
        <article className="p-4 border border-gray-200 rounded-xl">
            <div className="aspect-video rounded-md overflow-hidden mb-4">
                <Link href={`/${enhancedArticleType}/${slug}`}>
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
                <h2 className="text-2xl leading-6 font-semibold mb-2">
                    <Link className="text-current hover:no-underline" href={`/${enhancedArticleType}/${slug}`}>
                        {title}
                    </Link>
                </h2>
                <p className="text-gray-500 text-sm">{description}</p>
            </div>
        </article>
    );
}
