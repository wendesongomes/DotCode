import {
  DotsThreeOutline,
  SealCheck,
  TrashSimple,
  UserCircle,
} from '@phosphor-icons/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import DelPost from '../services/deletePost'
import { useSession } from 'next-auth/react'
import postTime from '../services/postTime'
import { PostProps, UserProps } from '../../../global'
import { Interactive } from './feed/post/interactive/interactive'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PostsProps {
  posts: PostProps[]
  user: UserProps
  children?: React.ReactNode
}

export default function Posts({ posts, user, children }: PostsProps) {
  const { update } = useSession()
  const [modal, setModal] = useState(false)
  const router = useRouter()

  if (posts.length) {
    return (
      <section className="flex w-full flex-col gap-4 justify-center items-center">
        <div className="flex flex-col w-full items-center justify-center gap-2 text-stone-600">
          {posts.map((post) => (
            <div
              onClick={() => {
                !modal &&
                  router.push(`/${post.author.username}/post/${post.id}`)
                update()
              }}
              key={post.id}
              className="w-full cursor-pointer h-auto text-white border border-stone-800 rounded-md p-4 flex gap-3 flex-col hover:bg-stone-900 transition-all"
            >
              <div className="flex gap-3 w-full">
                {post.author.image ? (
                  <Avatar>
                    <AvatarImage src={String(post.author.image)} />
                    <AvatarFallback>{post.author.name}</AvatarFallback>
                  </Avatar>
                ) : (
                  <UserCircle size={40} weight="fill" />
                )}
                <div className="w-full">
                  <div className="flex justify-between w-full items-center">
                    <div className="flex sm:flex-row sm:max-w-[460px] max-w-[200px] flex-col sm:gap-2 gap-0 text-ellipsis whitespace-nowrap overflow-hidden ">
                      <div className="flex gap-2 items-center">
                        <Link
                          href={`/${post.author.username}`}
                          className="hover:underline sm:max-w-full max-w-[150px] text-ellipsis whitespace-nowrap overflow-hidden"
                        >
                          {post.author.name}
                        </Link>
                        {post.author.verified && (
                          <SealCheck
                            size={20}
                            weight="fill"
                            className="text-sky-500"
                          />
                        )}
                      </div>
                      <p className="sm:max-w-[200px] max-w-[150px] text-ellipsis whitespace-nowrap overflow-hidden text-stone-700">
                        @{post.author.username}
                      </p>
                    </div>
                    {(user.admin || user.id === post.authorId) && (
                      <DropdownMenu onOpenChange={setModal}>
                        <DropdownMenuTrigger className="outline-none">
                          <DotsThreeOutline
                            size={20}
                            weight="fill"
                            className="text-white/20 hover:text-white"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-2 rounded-md mt-2 border border-stone-800 bg-transparent">
                          <DropdownMenuItem
                            className="outline-none flex gap-2 text-red-500 hover:bg- justify-center items-center text-sm p-1 rounded-md transition-all duration-150 cursor-pointer"
                            onClick={() => DelPost(post.id, update)}
                          >
                            <TrashSimple size={20} weight="fill" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <p className="text-xs text-stone-600">
                    {postTime(post.id, posts)}
                  </p>
                </div>
              </div>
              <p className="whitespace-pre-wrap text-sm prose-slate">
                {post.content}
              </p>
              <Interactive
                isLike={user.likes.some(({ postId }) => postId === post.id)}
                isSave={user.saves.some(({ postId }) => postId === post.id)}
                postId={post.id}
                countLikes={post.likes.length}
                username={user.username}
              />
            </div>
          ))}
        </div>
      </section>
    )
  } else {
    return <div>{children}</div>
  }
}
