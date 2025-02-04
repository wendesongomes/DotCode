'use client'

import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { Aside } from '@/app/components/authenticate/aside'
import { Providers } from '@/app/provider'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { status } = useSession()

  if (status === 'loading') return null

  if (status === 'unauthenticated') {
    return (
      <Providers>
        <html lang="en">
          <body className={`${inter.className} bg-white`}>
            <div className="flex">
              <Aside src="/man.jpeg" />
              <main className="w-full h-auto lg:mt-0 mt-20 flex flex-col gap-8 sm:min-w-[600px] justify-center items-center overflow-hidden">
                {children}
              </main>
            </div>
          </body>
        </html>
      </Providers>
    )
  }

  redirect('/home')
}
