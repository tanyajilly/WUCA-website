import Posts from '@/app/ui/posts';
import Button from '@/app/ui/button';
import Link from 'next/link';
import { getArticles } from '@/app/lib/data';
import { ArticlesResponse } from '@/app/lib/definitions';

export default async function Home() {
  const articles: ArticlesResponse = await getArticles(1, 2);
  return (
    <>
      <h1 className="text-8xl bold text-center">Home page</h1>
      <h2 className="text-5xl text-center">Latest Posts</h2>
      <Posts articles={articles} pageSize={2} />
      <Link className='btn-primary mt-2' href='./blog'>See all</Link>
    </>
  )
}
