'use client'

import { useSearchParams } from 'next/navigation'

export default function ConfirmEmail() {
  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  return (
    <>
      <p>Search: {token}</p>
    </>
  )
}
