import Posts from "@/app/ui/post-listing";
import { getArticles } from "@/app/lib/data";
import { ArticlesResponse } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import initTranslations from "@/app/i18n";

export const metadata: Metadata = {
    title: 'News',
    description: 'News from WUCA and partners',
}

type NewsPageProps = {
    params: {
        locale: string;
    };
};

export default async function NewsListing({ params }: NewsPageProps) {
    const { locale } = params;
    const { t } = await initTranslations(locale, ["home"]);
    const articles: ArticlesResponse = await getArticles("articles", locale);
    if (!articles.data || articles.data.length === 0) {
        notFound();
    }
    return (
        <>
            <h1 className="text-3xl font-semibold mb-4 text-center">{t('latest_news')}</h1>
            <Posts
                articles={articles}
                articleType="articles"
                isPagination={true}
                locale={locale}
            />
        </>
    );
}
