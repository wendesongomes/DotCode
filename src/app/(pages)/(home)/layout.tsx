'use client'

import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { Header } from '@/app/components/header'
import { Suspense } from 'react'
import { Nav } from '@/app/components/nav/nav'
import { Aside } from '@/app/components/aside/aside'
import { LoadingAside } from '@/app/components/aside/loading'
import LoadingNav from '@/app/components/nav/loading'
import { Providers } from '@/app/provider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${inter.className}`}>
          <div className="w-screen h-auto min-h-screen text-stone-100 bg-stone-950">
            <div className="flex flex-col overflow-x-hidden">
              <Header />
              <div className="h-full w-full pt-5 flex lg:gap-10 xl:gap-20 gap-0 xl:justify-center justify-start">
                <Suspense fallback={<LoadingNav />}>
                  <Nav />
                </Suspense>
                <div className="min-h-screen w-full lg:w-2/6 sm:min-w-[500px] lg:min-w-[600px] lg:pr-0 pr-10">
                  {children}
                </div>
                <Suspense fallback={<LoadingAside />}>
                  <Aside />
                </Suspense>
              </div>
            </div>
          </div>
        </body>
      </html>
    </Providers>
  )
}
