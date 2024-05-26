import Link from "next/link";
import { formatDateToLocal } from "@/app/lib/utils";
import { getArticles, getHomepageContent } from "@/app/lib/data";
import {
    ArticlesResponse,
    Article,
    EventsResponse,
    Event,
} from "@/app/lib/definitions";
import PostPreview from "@/app/ui/post-preview";
import Slider from "@/app/ui/page-sections/slider";
import TextSection from "@/app/ui/page-sections/text-section";
import Calendar from "@/app/ui/full-calendar";
import { notFound } from "next/navigation";
import initTranslations from "@/app/i18n";

type HomePageProps = {
    params: {
        locale: string;
    };
};

export default async function HomePage({ params: { locale } }: HomePageProps) {
    const { t } = await initTranslations(locale, ["home"]);
    const newsNumber = 3;
    const news: ArticlesResponse = await getArticles(
        "articles",
        locale,
        1,
        newsNumber
    );
    const events: EventsResponse = await getArticles(
        "events",
        locale,
        1,
        newsNumber
    );
    const homepage = await getHomepageContent(locale);
    if (!homepage.data) {
        notFound();
    }
    const carousel = homepage.data.attributes.carousel;
    const about = homepage.data.attributes.about;
    const fact = homepage.data.attributes.fact;
    const warInfo = homepage.data.attributes.warInfo;

    return (
        <>
            {carousel && <Slider content={carousel.photo} />}
            {about && (
                <section className="mb-10 p-4 border border-gray-200 rounded-xl">
                    <TextSection
                        {...about}
                        sectionClassName="!m-0 prose prose-p:font-sans max-w-none items-center"
                        imageClassName="md:w-3/6 *:lg:m-0"
                    />
                </section>
            )}
            {events && (
                <section className="mb-10">
                    <h2 className="font-medium text-4xl mb-2 text-center">{t("upcoming_events")}</h2>
                    <Calendar eventsList={events} locale={locale} />
                    <ul className="">
                        {events.data &&
                            events.data.map((event: Event) => {
                                const { title, description, slug, startDate } =
                                    event.attributes;
                                const date = formatDateToLocal(startDate);
                                return (
                                    <li className="mt-3" key={event.id}>
                                        <h3>
                                            <Link href={`/events/${slug}`}>
                                                {title} - {date}
                                            </Link>
                                        </h3>
                                        <p>{description}</p>
                                    </li>
                                );
                            })}
                    </ul>
                    <Link className="btn-primary mt-2" href="./events">
                        {t("see_all_events")}
                    </Link>
                </section>
            )}
            {fact && (
                <section className="p-4 border border-gray-200 rounded-xl mb-10">
                    <TextSection
                        {...fact}
                        sectionClassName="!m-0 items-center"
                        imageClassName="lg:w-1/5 mb-2 lg:m-0"
                    />
                </section>
            )}
            {news && (
                <section className="mb-10">
                    <h2 className="font-medium text-4xl mb-4">{t("our_news")}</h2>
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {news.data &&
                            news.data.map((article: Article) => (
                                <PostPreview
                                    key={article.id}
                                    article={article}
                                    articleType="articles"
                                />
                            ))}
                    </section>
                    <Link className="btn-primary mt-2" href="./news">
                        {t("see_all_news")}
                    </Link>
                </section>
            )}
            {warInfo && (
                <section className="p-4 border border-gray-200 rounded-xl">
                    <TextSection
                        {...warInfo}
                        sectionClassName="items-center !m-0"
                        imageClassName="md:w-2/4 mb-2 lg:m-0"
                    />
                </section>
            )}
        </>
    );
}
