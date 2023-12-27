'use client'

import { PostForm } from '@/app/components/feed/post/form'
import { Interactive } from '@/app/components/feed/post/interactive/interactive'
import Posts from '@/app/components/posts'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import DelPost from '@/app/services/deletePost'
import postTime from '@/app/services/postTime'
import { TrashSimple, UserCircle } from '@phosphor-icons/react'
import { DotsThreeOutline, SealCheck } from '@phosphor-icons/react/dist/ssr'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

export default function Page({
  params,
}: {
  params: { users: string; id: number }
}) {
  const { data: session, update } = useSession()
  const router = useRouter()

  if (session) {
    const posts = session.post
    const user = session.user
    const post = posts.find(({ id }) => id === Number(params.id))

    if (post && post.author.username !== params.users) {
      redirect(`/${post.author.username}/post/${params.id}`)
    }

    if (post === undefined) {
      return (
        <div className="w-full min-h-screen flex flex-col">
          <div className="w-full mt-20 flex flex-col items-center gap-4">
            <p className="text-sm w-3/4 text-center">
              Oh, this page doesnt exist. Try looking for something else.
            </p>
            <button
              className="px-2 py-1 border border-stone-800 rounded-md hover:bg-stone-800"
              onClick={() => router.push('/home')}
            >
              Home
            </button>
          </div>
        </div>
      )
    }

    return (
      <section className="flex w-full flex-col gap-4 justify-center items-center">
        <div className="flex flex-col w-full items-center justify-center gap-2 text-stone-600">
          <div
            key={post.id}
            className="w-full h-auto text-white border border-stone-800 rounded-md p-4 flex gap-3 flex-col"
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
                    <DropdownMenu>
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
            <div className="flex flex-col gap-2">
              <p className="whitespace-pre-wrap text-sm prose-slate">
                {post.content}
              </p>
              {post.image && (
                <img src={post.image} alt="" className="rounded-md" />
              )}
            </div>

            <Interactive
              isLike={user.likes.some(
                ({ postId }) => Number(params.id) === postId,
              )}
              isSave={user.saves.some(({ postId }) => postId === post.id)}
              postId={Number(params.id)}
              countLikes={post.likes.length}
              username={params.users}
            />
            <PostForm
              placeholder="Post your answer"
              url="/api/create/post"
              postId={Number(params.id)}
              enableUpdate
            />
            <Posts posts={post.childPosts} user={user} />
          </div>
        </div>
      </section>
    )
  }
}
