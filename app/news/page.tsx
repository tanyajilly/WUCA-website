import Posts from "@/app/ui/post-listing";
import { getArticles } from "@/app/lib/data";
import { ArticlesResponse } from "@/app/lib/definitions";
import { notFound } from "next/navigation";

export default async function NewsListing() {
    const articles: ArticlesResponse = await getArticles('articles');
    if (!articles.data) {
        notFound();
    }
    return (
        <Posts articles={articles} articleType="articles" isPagination={true} />
    );
}
