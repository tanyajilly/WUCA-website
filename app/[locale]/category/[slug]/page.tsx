import Posts from "@/app/ui/post-listing-category";
import { fetchAllContentByCategory, getCategoryNameBySlug } from "@/app/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import initTranslations from "@/app/i18n";
import type { Article } from "@/app/lib/definitions";

type CategoryPageProps = {
    params: {
        locale: string;
        slug: string;
    };
};

type CategoryData = {
    results: Article[];
    categoryName: string
}

export async function generateMetadata(
    { params }: CategoryPageProps
): Promise<Metadata> {
    const { slug, locale } = params;
    const categoryName = await getCategoryNameBySlug(slug)
    return {
        title: categoryName,
        description: `Articles from ${categoryName} category`,
    };
}

export default async function CategoryListing({ params }: CategoryPageProps) {
    const { locale, slug } = params;
    const { results, category } = await fetchAllContentByCategory(slug, locale);
    if (!results || results.length === 0) {
        notFound();
    }
    return (
        <>
            <h1 className="text-3xl font-semibold mb-4 text-center">{category}</h1>
            <Posts
                articles={results}
                locale={locale}
                category={slug}
            />
        </>
    );
}
