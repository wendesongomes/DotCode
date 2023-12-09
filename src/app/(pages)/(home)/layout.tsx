'use client'

import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { Header } from '@/app/components/header'
import { Nav } from '@/app/components/nav'
import { Aside } from '@/app/components/aside'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden bg-white`}>
        <div className="w-screen min-h-screen flex flex-col text-stone-100 bg-stone-950">
          <Header />
          <div className="h-full w-full pt-10 flex lg:gap-10 xl:gap-20 gap-0 xl:justify-center justify-start">
            <Nav />
            {children}
            <Aside />
          </div>
        </div>
      </body>
    </html>
  )
}
