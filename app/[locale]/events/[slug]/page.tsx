import Event from '@/app/ui/event';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/app/lib/data';
import { SingleEventResponse } from '@/app/lib/definitions';
import type { Metadata, ResolvingMetadata } from "next";

type SingleEventPageProps = {
  params: {
      slug: string;
      locale: string;
  };
};

export async function generateMetadata(
  { params }: SingleEventPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, locale } = params;
  const event: SingleEventResponse = await getArticleBySlug(slug, 'events', locale);
  const previousImages = (await parent).openGraph?.images || []
  
  return {
      title: event.data?.attributes.title,
      openGraph: {
        images: [event.data?.attributes.image?.data?.attributes.url, ...previousImages],
      },
  };
}

export default async function SingleEvent({ params }: SingleEventPageProps) {
  const { slug, locale } = params;
  const event: SingleEventResponse = await getArticleBySlug(slug, 'events', locale);

  if (!event.data) {
    notFound();
  }
  
  return (
      <Event event={event.data} />
  )
}

