import { Heart } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export interface LikesProps {
  countLikes: number
  postId: number
  isLike: boolean
}

export function Likes({ postId, countLikes, isLike }: LikesProps) {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(isLike)
  const [likesCount, setLikesCount] = useState(countLikes)

  if (session) {
    const user = session.user

    const like = async (postId: number) => {
      try {
        await fetch('/api/create/like', {
          method: 'POST',
          body: JSON.stringify({
            postId,
            userId: user.id,
          }),
        })
        setIsLiked(!isLiked)
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
      } catch (error) {
        console.error('error:', error)
      }
    }

    const onClick = (
      event: React.MouseEvent<HTMLAnchorElement>,
      postId: number,
    ) => {
      event.preventDefault()
      like(postId)
    }

    return (
      <Link
        passHref
        href={'#'}
        className={`flex sm:min-w-[60px] items-center px-2 py-1 rounded-md cursor-pointer hover:text-red-500 transition-all ${
          isLiked ? 'text-red-500' : 'text-white'
        }`}
        onClick={(event) => onClick(event, postId)}
      >
        <Heart
          size={35}
          weight={isLiked ? 'fill' : 'regular'}
          className="hover:bg-red-500/10 p-2 rounded-full"
        />
        <p
          className={`${
            likesCount > 0 ? 'block' : 'hidden'
          } text-sm transition-all ease-in-out`}
        >
          {likesCount}
        </p>
      </Link>
    )
  }
}
