import { CommentsPost } from '@/app/components/button/commentsPost'
import { useSession } from 'next-auth/react'

export function Comments({ postId }: { postId: number }) {
  const { data: session } = useSession()

  if (session) {
    const posts = session.post
    const post = posts.find(({ id }) => postId === id)
    if (post) {
      return <CommentsPost post={post} postId={postId} />
    }
  }
}
