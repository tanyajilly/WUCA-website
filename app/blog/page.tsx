import Posts from "@/app/ui/post-listing";
import { getArticles } from "@/app/lib/data";
import { ArticlesResponse } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import { PAGE_SIZE } from "@/app/lib/constants";

export default async function NewsListing() {
    const pageSize = PAGE_SIZE;
    const articles: ArticlesResponse = await getArticles(1, pageSize);
    if (!articles.data) {
        notFound();
    }
    return (
        <Posts articles={articles} isPagination={true} pageSize={pageSize} />
    );
}
