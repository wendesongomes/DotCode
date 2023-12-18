import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { ChatDots, UserCircle } from '@phosphor-icons/react'
import { PostProps } from '../../../../global'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import postTime from '@/app/services/postTime'
import { PostForm } from '../feed/post/form'

interface FormProps {
  postId: number
  post: PostProps
}

export function CommentsPost({ postId, post }: FormProps) {
  const { data: session } = useSession()

  if (session) {
    const user = session.user
    const postComment = session.post.find(({ id }) => id === postId)
    if (postComment) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex justify-center items-center">
              <ChatDots
                size={35}
                className="hover:bg-blue-500/10 p-2 rounded-full transition-all"
              />
              <p
                className={`text-sm transition-all ${
                  post.childPosts.length === 0 && 'hidden'
                }`}
              >
                {post.childPosts.length}
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="w-full sm:h-auto h-screen bg-black text-stone-100 border-none ">
            <DialogHeader className="flex gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 items-center">
                    {postComment.author.image ? (
                      <Avatar>
                        <AvatarImage src={String(postComment.author.image)} />
                        <AvatarFallback>
                          {postComment.author.name}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <UserCircle size={40} weight="fill" />
                    )}
                    <span className="relative -top-2 w-[2px] min-h-[20px] h-full bg-stone-800" />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center  gap-2">
                      <DialogTitle className="text-sm ">
                        {postComment.author.name}
                      </DialogTitle>
                      <p className="sm:max-w-[200px] max-w-[100px] text-sm text-ellipsis whitespace-nowrap overflow-hidden text-stone-700">
                        @{postComment.author.username}
                      </p>
                      <p className="text-sm text-ellipsis whitespace-nowrap overflow-hidden text-stone-700">
                        {postTime(post.id, session.post)}
                      </p>
                    </div>
                    <DialogDescription className="text-white whitespace-pre-wrap text-sm prose-slate text-ellipsis overflow-hidden sm:line-clamp-[15] line-clamp-6">
                      {postComment.content}
                    </DialogDescription>
                    <p className="text-xs sm:max-w-[400px] max-w-[250px] text-stone-600 text-ellipsis whitespace-nowrap overflow-hidden">
                      replying to{' '}
                      <span className="text-amber-400">
                        @{postComment.author.username}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 w-full">
                  {user.image ? (
                    <Avatar>
                      <AvatarImage src={String(user.image)} />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <UserCircle size={40} weight="fill" />
                  )}
                  <PostForm
                    placeholder="Post your answer"
                    url="/api/create/post"
                    postId={25}
                  />
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
    }
  }
}
