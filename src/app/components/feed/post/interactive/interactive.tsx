import { Likes, LikesProps } from './likes'
import { Comments } from './comments'
import { Repost } from './repost'
import { Save } from './save'
import { Share } from './share'

interface InteractiveProps extends LikesProps {
  username: string
  isSave: boolean
}

export function Interactive({
  isLike,
  postId,
  countLikes,
  username,
  isSave,
}: InteractiveProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex sm:gap-3 gap-0 items-center justify-between"
    >
      <Comments postId={postId} />
      <Repost />
      <Likes isLike={isLike} postId={postId} countLikes={countLikes} />

      <div className="flex items-center">
        <Save postId={postId} isSave={isSave} />
        <Share postId={postId} username={username} />
      </div>
    </div>
  )
}
