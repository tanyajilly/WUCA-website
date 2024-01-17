import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/app/ui/nav';
import { UserProvider } from '@/app/lib/authContext';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WUCA',
  description: 'Winchester Ukrainian Cultural Association',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen flex-col items-center justify-between">
            <UserProvider>
                <header className="w-full bg-white text-black mb-2">
                  <div className="container mx-auto flex p-4 items-center">
                      <Link className="mr-auto" href="/"><img className="max-w-20" src="/logo.jpg" alt="WUCA" /></Link>
                      <Nav/>
                  </div>
                </header>
                <div className="container mx-auto p-4 flex-1">
                  <main>
                    {children}
                  </main>
                </div>
              </UserProvider>
          </div>
        </body>
    </html>
  )
}
