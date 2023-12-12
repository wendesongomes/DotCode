import Link from 'next/link'
import React from 'react'

interface SignProps {
  children: React.ReactNode
  href: string
  highlightedText: string
}

export function MessageAccount({ children, href, highlightedText }: SignProps) {
  return (
    <div className="flex gap-2 sm:text-base text-sm">
      <p>{children}</p>
      <div className="flex flex-col brightness-100 saturate-200 hover:brightness-75 hover:saturate-200">
        <Link
          href={href}
          className="relative z-20 bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text"
        >
          {highlightedText}
        </Link>
        <div className="w-full h-[2px] relative -top-1 z-10 bg-gradient-to-br from-red-500 via-purple-500 to-blue-500"></div>
      </div>
    </div>
  )
}
