import Post from "@/app/ui/post";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/app/lib/data";
import { SingleArticleResponse } from "@/app/lib/definitions";

type SingleFactPageProps = {
    params: {
        slug: string;
        locale: string;
    };
  };

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
