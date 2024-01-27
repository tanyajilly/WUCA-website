import Link from 'next/link'
 
export default async function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Could not find requested news page</p>
      <p>
        View <Link href="/blog">all posts</Link>
      </p>
    </div>
  )
}