import Link from 'next/link'
 
export default async function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Could not find requested event page</p>
      <p>
        View <Link href="/events">all events</Link>
      </p>
    </div>
  )
}