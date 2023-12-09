import { Heart } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface LikesProps {
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
      setIsLiked(!isLiked)
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
      await fetch('api/like', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          userId: user.id,
        }),
      })
    }

    return (
      <button
        className={`flex gap-2 items-center font-bold px-2 py-1 rounded-md cursor-pointer hover:text-red-500 hover:bg-red-950/50 ${
          isLiked ? 'bg-red-950/50 text-red-500' : 'bg-stone-900 text-white'
        }`}
        onClick={() => like(postId)}
      >
        <Heart size={20} weight={isLiked ? 'fill' : 'bold'} />
        <p className={`${likesCount > 0 ? 'block' : 'hidden'}`}>{likesCount}</p>
      </button>
    )
  }
}
