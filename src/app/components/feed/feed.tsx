'use client'

import { useSession } from 'next-auth/react'
import Posts from '../posts'

export async function Feed() {
  const { data: session } = useSession()

  if (session) {
    return <Posts posts={session.post} user={session.user} />
  }
}
