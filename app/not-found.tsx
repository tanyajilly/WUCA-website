import Link from 'next/link'
 
export default async function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>
        <Link href="/">Back to main page</Link>
      </p>
    </div>
  )
}