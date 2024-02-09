import Page from "@/app/ui/static-page";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/app/lib/data";
import { SinglePageResponse } from "@/app/lib/definitions";

type StaticPageProps = {
    params: {
        slug: string;
        locale: string;
    };
};
export default async function StaticPage({ params }: StaticPageProps) {
    const { slug, locale } = params;
    const page: SinglePageResponse = await getPageBySlug(slug, locale);
    if (!page.data) {
        notFound();
    }
    return <Page page={page.data} />;
}
