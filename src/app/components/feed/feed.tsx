'use client'

import { useSession } from 'next-auth/react'
import Posts from '../posts'
import { SmileySad } from '@phosphor-icons/react'

export async function Feed() {
  const { data: session } = useSession()

  if (session) {
    const posts = session.post.filter(({ parentId }) => parentId === null)
    return (
      <Posts posts={posts} user={session.user}>
        <div className="flex flex-col items-center justify-center gap-2 mt-4 text-stone-600">
          <SmileySad size={20} weight="fill" />
          <p>No posts found</p>
        </div>
      </Posts>
    )
  }
}
