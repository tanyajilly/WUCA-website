import Page from "@/app/ui/static-page";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/app/lib/data";
import { SinglePageResponse } from "@/app/lib/definitions";
import type { Metadata, ResolvingMetadata } from "next";

type StaticPageProps = {
    params: {
        subslug: string;
        locale: string;
    };
};

export async function generateMetadata(
    { params }: StaticPageProps
): Promise<Metadata> {
    const { subslug, locale } = params;
    const page: SinglePageResponse = await getPageBySlug(subslug, locale);

    return {
        title: page.data?.attributes.name
    };
}

export default async function StaticPage({ params }: StaticPageProps) {
    const { subslug, locale } = params;
    const page: SinglePageResponse = await getPageBySlug(subslug, locale);
    if (!page.data) {
        notFound();
    }
    return <Page page={page.data} />;
}
