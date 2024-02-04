import Link from "next/link";
import { formatDateToLocal } from "@/app/lib/utils";
import { getArticles, getHomepageContent, getEvents } from "@/app/lib/data";
import { ArticlesResponse, Article, EventsResponse, Event } from "@/app/lib/definitions";
import PostPreviewSmall from "@/app/ui/post-preview-sm";
import Slider from "@/app/ui/page-sections/slider";
import TextSection from "@/app/ui/page-sections/text-section";
import Calendar from "@/app/ui/full-calendar";

export default async function HomePage() {
	const newsNumber = 3;
	const news: ArticlesResponse = await getArticles(1, newsNumber);
	const events: EventsResponse = await getEvents(1, newsNumber);
	const homepage = await getHomepageContent();
	const carousel = homepage.data.attributes.carousel;
	const about = homepage.data.attributes.about;
	const fact = homepage.data.attributes.fact;
	const warInfo = homepage.data.attributes.warInfo;

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
			{
				events && (
					<section className="py-4">
						<h2 className="text-4xl mb-2">Calendar</h2>
						<Calendar eventsList={events} />
						<ul className="">
							{events.data && events.data.map((event: Event) => {
								const { title, description } = event.attributes.basicArticleData;
								const date = formatDateToLocal(event.attributes.startDate);
								return (
									<li className="mt-3" key={event.id}>
										<h3>
											<Link href={`/events/${event.attributes.slug}`}>
												{title} - {date}
											</Link>
										</h3>
										<p>{description}</p>
									</li>
								)
							})}
						</ul>
						<Link className="btn-primary mt-2" href="./events">
							See all events
						</Link>
					</section>
				)
			}
			{fact && (
				<section className="bg-slate-200">
					<TextSection
						{...fact}
						sectionClassName=" items-center"
						imageClassName="w-1/5"
					/>
				</section>
			)}
			{
				news && (
					<section className="py-4">
						<h2 className="text-4xl mb-2">Our News</h2>
						<section className="grid grid-cols-3 gap-20">
							{news.data && news.data.map((article: Article) => (
								<PostPreviewSmall key={article.id} article={article} />
							))}
						</ section>
						<Link className="btn-primary mt-2" href="./blog">
							See all news
						</Link>
					</section>
				)
			}
			{warInfo && (
				<section className="bg-slate-200 p-4">
					<TextSection
						{...warInfo}
						sectionClassName="items-center"
						imageClassName="w-1/2"
					/>
				</section>
			)}
		</>
	);
}
