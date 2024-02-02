import Link from "next/link";
import { getArticles, getHomepageContent } from "@/app/lib/data";
import { ArticlesResponse } from "@/app/lib/definitions";
import Posts from "@/app/ui/post-listing";
import Slider from "@/app/ui/page-sections/slider";
import TextSection from "@/app/ui/page-sections/text-section";

export default async function HomePage() {
    const homepage = await getHomepageContent();
    const carousel = homepage.data.attributes.carousel;
    const about = homepage.data.attributes.about;
    const articles: ArticlesResponse = await getArticles(1, 3);
    return (
        <>
            {carousel && <Slider content={carousel.photo} />}
            {about && (
				<section className="bg-slate-200">
					<TextSection
						{...about}
						sectionClassName=" items-center"
						imageClassName="w-1/2"
					/>
				</section>
            )}
			<section className="bg-red-200 py-5">
				<h2>Calendar</h2>
			</section>
            <h2 className="text-5xl text-center">Latest Posts</h2>
            <Posts articles={articles} pageSize={2} />
            <Link className="btn-primary mt-2" href="./blog">
                See all
            </Link>
        </>
    );
}
