import Event from '@/app/ui/event';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/app/lib/data';
import { SingleEventResponse } from '@/app/lib/definitions';

export default async function SingleEvent({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const event: SingleEventResponse = await getArticleBySlug(slug, 'events');

  if (!event.data) {
    notFound();
  }
  
  return (
      <Event event={event.data} />
  )
}

