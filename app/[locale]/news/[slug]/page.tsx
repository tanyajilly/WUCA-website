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
