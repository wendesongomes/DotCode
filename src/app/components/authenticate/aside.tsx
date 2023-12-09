'use client'

import { Quotes } from '@phosphor-icons/react'
import Image from 'next/image'

interface AsideProps {
  src: string
}

export function Aside({ src }: AsideProps) {
  return (
    <div className="h-screen w-full lg:block hidden overflow-hidden">
      <Image
        src={src}
        width={2060}
        height={1389}
        className="w-full h-full p-2 rounded-xl object-cover"
        alt="man"
      />
      <Quotes
        size={32}
        weight="fill"
        className="bg-white p-1 rounded-md rotate-180 absolute top-6 left-6"
      />
    </div>
  )
}
