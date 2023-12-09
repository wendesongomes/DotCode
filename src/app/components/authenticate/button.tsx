'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  url: string
  providers: string
  alt: string
}

export function Button({ children, url, alt, providers }: ButtonProps) {
  return (
    <button
      onClick={() => signIn(providers)}
      className="w-full p-2 border rounded-md text-sm font-medium flex justify-center items-center gap-2"
    >
      <Image src={url} height={20} width={20} alt={alt} />
      {children}
    </button>
  )
}
