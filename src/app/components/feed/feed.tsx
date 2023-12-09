'use client'

import {
  DotsThreeOutline,
  SealCheck,
  SmileySad,
  TrashSimple,
  UserCircle,
} from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Likes } from './likes'

export function Feed() {
  const { data: session } = useSession()

  const DelPost = async (id: number) => {
    const createPost = await fetch('/api/delete/post', {
      method: 'POST',
      body: JSON.stringify({
        id,
      }),
    })
    if (!createPost.ok) {
      const { error } = await createPost.json()
      console.error('error:', error)
    }
  }

  if (session) {
    const posts = session.post
    const user = session.user

    const postTime = (id: number) => {
      const post = posts.find((post) => post.id === id)

      if (post) {
        const nowTime = new Date()
        const postDate = new Date(post.createdAt)

        const timeChange = nowTime.getTime() - postDate.getTime()

        const seconds = Math.floor(timeChange / 1000)
        const minutes = Math.floor(seconds / 60)
        const hour = Math.floor(minutes / 60)
        const day = Math.floor(hour / 24)

        if (day > 0) {
          return `${day} day`
        }
        if (hour > 0) {
          return `${hour} h`
        }
        if (minutes > 0) {
          return `${minutes} min`
        }
        if (seconds > 0) {
          return `${seconds} sec`
        }
        if (hour > 24) {
          return `${
            postDate.getDate() +
            '/' +
            (postDate.getMonth() + 1) +
            '/' +
            postDate.getFullYear()
          }`
        }
      }
      return 'not found'
    }

    if (posts.length !== 0) {
      return (
        <section className="flex w-full flex-col gap-4 justify-center items-center">
          <div className="flex flex-col-reverse w-full items-center justify-center gap-2 text-stone-600">
            {posts.map((post) => (
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
                  <div className="w-full ">
                    <div className="flex justify-between w-full items-center">
                      <div className="flex sm:flex-row sm:max-w-[460px] max-w-[200px] flex-col sm:gap-2 gap-0 text-ellipsis whitespace-nowrap overflow-hidden ">
                        <div className="flex gap-2 items-center">
                          <a
                            href={`/${post.author.username}`}
                            className="hover:underline sm:max-w-full max-w-[150px] text-ellipsis whitespace-nowrap overflow-hidden"
                          >
                            {post.author.name}
                          </a>
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
                              className="text-white"
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="p-2 rounded-md mt-2 border border-stone-800 bg-transparent">
                            <DropdownMenuItem
                              className="outline-none flex gap-2 text-red-500 hover:bg- justify-center items-center text-sm p-1 rounded-md transition-all duration-150 cursor-pointer"
                              onClick={() => DelPost(post.id)}
                            >
                              <TrashSimple size={20} weight="fill" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                    <p className="text-xs text-stone-600">
                      {postTime(post.id)}
                    </p>
                  </div>
                </div>
                <div className="whitespace-pre-wrap sm:text-base text-sm">
                  {post.content}
                </div>
                <div className="flex gap-3 items-center">
                  <Likes
                    isLike={user.likes.some(({ postId }) => postId === post.id)}
                    postId={post.id}
                    countLikes={post.likes.length}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )
    } else {
      return (
        <div>
          <section className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-2 mt-4 text-stone-600">
              <SmileySad size={20} weight="fill" />
              <p>Nenhum post encontrado</p>
            </div>
          </section>
        </div>
      )
    }
  }
}
