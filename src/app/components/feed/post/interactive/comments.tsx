import { CommentsPost } from '@/app/components/button/commentsPost'
import { useSession } from 'next-auth/react'

export function Comments({ postId }: { postId: number }) {
  const { data: session } = useSession()

  if (session) {
    const posts = session.post
    const post = posts.find(({ id }) => postId === id)
    if (post) {
      return (
        <div
          onClick={(e) => e.preventDefault()}
          className={`flex sm:min-w-[60px] items-center px-2 py-1 rounded-md cursor-pointer hover:text-blue-400 transition-all`}
        >
          <CommentsPost post={post} postId={postId} />
        </div>
      )
    }
  }
}
