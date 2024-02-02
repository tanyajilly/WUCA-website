import Post from "@/app/ui/post";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/app/lib/data";
import { SingleArticleResponse } from "@/app/lib/definitions";

export default async function SingleArticle({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;
    const article: SingleArticleResponse = await getArticleBySlug(
        slug,
        "articles"
    );
    if (!article.data) {
        notFound();
    }
    return <Post article={article.data} />;
}
