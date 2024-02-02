import Page from '@/app/ui/static-page';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/app/lib/data';
import { SinglePageResponse } from '@/app/lib/definitions';

export default async function StaticPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const page: SinglePageResponse = await getPageBySlug(slug);
  console.log(page);
  if (!page.data) {
    notFound();
  }
  return (
      <Page page={page.data} />
  )
}

