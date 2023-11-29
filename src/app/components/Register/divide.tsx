import React from 'react'

export function Divide({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-2/4 flex justify-center items-center before:content-[''] before:block before:w-full before:h-[1px] before:bg-black/10 after:content-[''] after:block after:w-full after:h-[1px] after:bg-black/10">
      <p className="mx-3">{children}</p>
    </div>
  )
}
