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
        <article className="flex gap-6 w-full">
            <div className="w-1/5 shrink-0 aspect-square rounded-md overflow-hidden">
                <Link href={`/${enhancedArticleType}/${slug}`}>
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
                <h2 className="text-lg">
                    <Link href={`/${enhancedArticleType}/${slug}`}>
                        {title}
                    </Link>
                </h2>
                <p>{description}</p>
            </div>
        </article>
    );
}
