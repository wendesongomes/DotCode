'use client'

import { Main } from '@/app/components/main'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { status } = useSession()

  if (status === 'authenticated') {
    return <Main />
  }
}
