'use client'

import { Quotes } from '@phosphor-icons/react'

export function Aside() {
  return (
    <div className="h-full w-2/4 lg:block hidden bg-[url('https://images.unsplash.com/photo-1543965860-82ed7d542cc4?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-cover rounded-xl overflow-hidden">
      <Quotes
        size={32}
        weight="fill"
        className="bg-white p-1 rounded-md rotate-180 absolute left-6 top-6"
      />
    </div>
  )
}
