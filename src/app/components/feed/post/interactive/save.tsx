import { BookmarkSimple } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export interface SaveProps {
  postId: number
  isSave: boolean
}

export function Save({ postId, isSave }: SaveProps) {
  const { data: session, update } = useSession()
  const [isSaved, setIsSaved] = useState(isSave)
  const path = usePathname()

  if (session) {
    const user = session.user

    const save = async (postId: number) => {
      try {
        await fetch('/api/create/save', {
          method: 'POST',
          body: JSON.stringify({
            postId,
            userId: user.id,
          }),
        })
        setIsSaved(!isSaved)
      } catch (error) {
        console.error('error:', error)
      }
    }

    const reload = async (
      event: React.MouseEvent<HTMLAnchorElement>,
      postId: number,
    ) => {
      save(postId)
      event.preventDefault()
      if (path === '/i/saves') await update()
    }

    return (
      <Link
        passHref
        onClick={(e) => reload(e, postId)}
        href={''}
        className={`flex sm:min-w-[60px] items-center px-2 py-1 rounded-md cursor-pointer hover:text-amber-500 transition-all ${
          isSaved ? 'text-amber-500' : 'text-white'
        }`}
      >
        <BookmarkSimple
          size={35}
          weight={isSaved ? 'fill' : 'regular'}
          className="hover:text-amber-400 hover:bg-amber-500/10 p-2 rounded-full transition-all"
        />
      </Link>
    )
  }
}
