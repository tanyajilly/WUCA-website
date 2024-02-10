import Post from "@/app/ui/post";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/app/lib/data";
import { SingleArticleResponse } from "@/app/lib/definitions";
import type { Metadata, ResolvingMetadata } from "next";

type SingleFactPageProps = {
    params: {
        slug: string;
        locale: string;
    };
};

export async function generateMetadata(
    { params }: SingleFactPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug, locale } = params;
    const article: SingleArticleResponse = await getArticleBySlug(
        slug,
        "facts",
        locale
    );
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: article.data?.attributes.title,
        openGraph: {
            images: [
                article.data?.attributes.image?.data?.attributes.url,
                ...previousImages,
            ],
        },
    };
}

export default async function SingleFact({ params }: SingleFactPageProps) {
    const { slug, locale } = params;
    const article: SingleArticleResponse = await getArticleBySlug(
        slug,
        "facts",
        locale
    );
    if (!article.data) {
        notFound();
    }
    return <Post article={article.data} locale={locale} />;
}
