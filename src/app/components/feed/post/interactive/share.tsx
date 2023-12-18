'use client'

import { Export } from '@phosphor-icons/react'
import Link from 'next/link'

export function Share({
  username,
  postId,
}: {
  username: string
  postId: number
}) {
  const shareUrl = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigator.clipboard.writeText(
      `${window.location.origin}/${username}/post/${postId}`,
    )
  }
  return (
    <Link
      passHref
      href={''}
      className="sm:min-w-[60px]"
      onClick={(e) => shareUrl(e)}
    >
      <Export
        size={35}
        className="hover:text-amber-400 hover:bg-amber-500/10 p-2 rounded-full transition-all"
      />
    </Link>
  )
}
