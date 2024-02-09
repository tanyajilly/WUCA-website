import Event from '@/app/ui/event';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/app/lib/data';
import { SingleEventResponse } from '@/app/lib/definitions';

type SingleEventPageProps = {
  params: {
      slug: string;
      locale: string;
  };
};

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

