import { getHelpPageContent } from "@/app/lib/data";
import Accordion from "@/app/ui/page-sections/accordion";
import { notFound } from "next/navigation";

type HelpPageProps = {
    params: {
        locale: string;
    };
};

export default async function HelpPage({ params: { locale } }: HelpPageProps) {
	const content = await getHelpPageContent(locale);
	if (!content.data || content.data.length === 0) {
		notFound();
	}
	const { info, moreInfo, list } = content.data[0].attributes;

	return (
		<>
			{info && (
				<div
                    className="text-justify mb-4"
                    dangerouslySetInnerHTML={{ __html: info }}
                />
			)}
            {
                list && <Accordion items={list.data} />
            }
            {moreInfo && (
				<div
                    className="text-justify"
                    dangerouslySetInnerHTML={{ __html: moreInfo }}
                />
			)}
		</>
	);
}
