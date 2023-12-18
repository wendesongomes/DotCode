'use client'

import Posts from '@/app/components/posts'
import { BookmarkSimple } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'

export default function Saves() {
  const { data: session } = useSession()

  if (session) {
    const saves = session.post.filter(({ id }) =>
      session.user.saves.some(({ postId }) => postId === id),
    )

    return (
      <Posts posts={saves} user={session.user}>
        <div className="flex items-center justify-center gap-2 mt-4 text-stone-600">
          <BookmarkSimple size={20} weight="fill" />
          <p>No posts saved</p>
        </div>
      </Posts>
    )
  }
}
