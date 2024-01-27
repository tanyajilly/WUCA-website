import Post from '@/app/ui/post';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/app/lib/data';
import { SingleArticleResponse } from '@/app/lib/definitions';

export default async function SingleArticle({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article: SingleArticleResponse = await getArticleBySlug(slug);
  if (!article.data) {
    notFound();
  }
  return (
    <>
      <h1 className="text-8xl bold text-center">Single Article</h1>
      <Link className='btn-primary mt-2' href='/blog'>Back</Link>
      <Post article={article.data} />
    </>
  )
}

