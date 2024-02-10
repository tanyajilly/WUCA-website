import Posts from "@/app/ui/post-listing";
import { getArticles } from "@/app/lib/data";
import { ArticlesResponse } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Discover Ukraine',
	description: 'Interesting facts about history and culture of Ukraine',
}

type FactsPageProps = {
    params: {
        locale: string;
    };
};

export default async function FactsListing({ params }: FactsPageProps) {
    const { locale } = params;
    const articles: ArticlesResponse = await getArticles("facts", locale);
    console.log(articles);
    if (!articles.data || articles.data.length === 0) {
        notFound();
    }
    return (
        <Posts articles={articles} articleType="facts" isPagination={true} locale={locale} />
    );
}
