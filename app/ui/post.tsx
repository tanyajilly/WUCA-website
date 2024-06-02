import Image from "next/image";
import Link from "next/link";
import { Article } from "@/app/lib/definitions";
import { formatDateToLocal } from "@/app/lib/utils";
import { getContentComponent } from "@/app/lib/renderDynamicZone";
import initTranslations from "@/app/i18n";
import ShareButtons from "./share-buttons";

type PostProps = {
    article: Article;
    locale: string;
};

export default async function Post({ article, locale }: PostProps) {
    const { t } = await initTranslations(locale, ["default"]);
    const { title, image, author, publishedAt, pageContent, categories, description } =
        article.attributes;
    const { width, height, url } = image?.data?.attributes || {};
    return (
        <article className="container px-0 max-w-screen-md">
            <div className="mb-4">
                <h1 className="text-center text-2xl mb-4 text-4xl font-semibold leading-tight">{title}</h1>
                <div className="text-center">
                    {formatDateToLocal(publishedAt)}{" "}
                    {author?.data && `by ${author.data.attributes.name}`}
                </div>
            </div>

            <div className="w-full rounded-md overflow-hidden mb-8">
                {url && (
                    <Image
                        src={url}
                        alt={title}
                        width={width}
                        height={height}
                        className="w-full object-cover aspect-video m-0"
                    />
                )}
            </div>
            <div className="prose max-w-none lg:prose-p:text-xl prose-p:mt-0">{pageContent.map(getContentComponent)}</div>
            {categories?.data && categories.data.length > 0 && (
                <>
                    <strong>{t("categories")}:</strong>
                    <ul className="flex flex-wrap space-x-4">
                        {categories.data.map((cat) => (
                            <li key={cat.id}>
                                <Link
                                    href={`/category/${cat.attributes.slug}`}
                                >
                                    {cat.attributes.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <div className="mt-4">
                <ShareButtons
                    title={title}
                    text={description}
                />
            </div>
        </article>
    );
}
