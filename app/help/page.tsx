import Link from "next/link";
import { formatDateToLocal } from "@/app/lib/utils";
import { getHelpPageContent } from "@/app/lib/data";
import { ArticlesResponse, Article, EventsResponse, Event } from "@/app/lib/definitions";
import PostPreviewSmall from "@/app/ui/post-preview-sm";
import Slider from "@/app/ui/page-sections/slider";
import TextSection from "@/app/ui/page-sections/text-section";
import Calendar from "@/app/ui/full-calendar";
import { notFound } from "next/navigation";

export default async function HomePage() {
	const content = await getHelpPageContent();
	if (!content.data) {
		notFound();
	}
	const { info, moreInfo, list } = content.data.attributes;

	return (
		<>
			{info && (
				<div
                    className="text-justify"
                    dangerouslySetInnerHTML={{ __html: info }}
                />
			)}
            {
                list && <div>Accordion FAQ</div>
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
