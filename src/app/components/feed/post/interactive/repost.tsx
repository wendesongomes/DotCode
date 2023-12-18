import { Swap } from '@phosphor-icons/react'
import Link from 'next/link'

export function Repost() {
  return (
    <Link
      passHref
      href={''}
      className="sm:min-w-[60px]"
      onClick={(e) => e.preventDefault()}
    >
      <Swap
        size={35}
        className="hover:text-emerald-400 hover:bg-emerald-500/10 p-2 rounded-full transition-all"
      />
    </Link>
  )
}
