import type { Metadata, ResolvingMetadata } from "next";
import Post from "@/app/ui/post";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/app/lib/data";
import { SingleArticleResponse } from "@/app/lib/definitions";

type SingleArticlePageProps = {
    params: {
        slug: string;
        locale: string;
    };
};

export async function generateMetadata(
    { params }: SingleArticlePageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug, locale } = params;
    const article: SingleArticleResponse = await getArticleBySlug(
        slug,
        "articles",
        locale
    );
    const previousImages = (await parent).openGraph?.images || [];
    return {
        title: article.data?.attributes.title,
        description:  article.data?.attributes.description || (await parent).description,
        openGraph: {
            images: [
                article.data?.attributes.image?.data?.attributes.url,
                ...previousImages,
            ],
        },
    };
}

export default async function SingleArticle({ params }: SingleArticlePageProps) {
    const { slug, locale } = params;
    const article: SingleArticleResponse = await getArticleBySlug(
        slug,
        "articles",
        locale
    );
    if (!article.data) {
        notFound();
    }
    return <Post article={article.data} locale={locale} />;
}
