import Link from "next/link";
import { formatDateToLocal } from "@/app/lib/utils";
import { getArticles, getHomepageContent } from "@/app/lib/data";
import {
    ArticlesResponse,
    Article,
    EventsResponse,
    Event,
} from "@/app/lib/definitions";
import PostPreviewSmall from "@/app/ui/post-preview-sm";
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
                <section className="bg-slate-200">
                    <TextSection
                        {...about}
                        sectionClassName=" items-center"
                        imageClassName="md:w-3/6"
                    />
                </section>
            )}
            {events && (
                <section className="py-4">
                    <h2 className="text-4xl mb-2">{t("upcoming_events")}</h2>
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
                <section className="bg-slate-200">
                    <TextSection
                        {...fact}
                        sectionClassName=" items-center"
                        imageClassName="lg:w-1/5"
                    />
                </section>
            )}
            {news && (
                <section className="py-4">
                    <h2 className="text-4xl mb-2">{t("our_news")}</h2>
                    <section className="flex flex-col *:mb-5 md:grid md:grid-cols-3 md:gap-10 lg:gap-20">
                        {news.data &&
                            news.data.map((article: Article) => (
                                <PostPreviewSmall
                                    key={article.id}
                                    article={article}
                                />
                            ))}
                    </section>
                    <Link className="btn-primary mt-2" href="./news">
                        {t("see_all_news")}
                    </Link>
                </section>
            )}
            {warInfo && (
                <section className="bg-slate-200 p-4">
                    <TextSection
                        {...warInfo}
                        sectionClassName="items-center"
                        imageClassName="md:w-2/4"
                    />
                </section>
            )}
        </>
    );
}
