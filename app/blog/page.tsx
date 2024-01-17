import Posts from '@/app/ui/posts';
import { getArticles } from '@/app/lib/data';
import { ArticlesResponse } from '@/app/lib/definitions';


export default async function Home() {
  const pageSize: number = 2;
  const articles: ArticlesResponse = await getArticles(1, pageSize);
  return (
    <>
      <h1 className="text-8xl bold text-center">All Articles</h1>
      <Posts
        articles={articles}
        isPagination={true}
        pageSize={pageSize}
      />
    </>
  )
}