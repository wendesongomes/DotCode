'use client'

import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { EditProfile } from './button/editProfile'
import Posts from './posts'
import { SealCheck } from '@phosphor-icons/react/dist/ssr'

export function Perfil({ users }: { users: string }) {
  const { data: session } = useSession()
  if (session) {
    const user = session.allUsers.find(({ username }) => users === username)
    if (user) {
      const userLogged = session.user
      const { image, name, username, id, verified } = user
      const posts = session.post.filter(
        ({ authorId, parentId }) => authorId === id && parentId === null,
      )

      return (
        <>
          <div className="w-full h-[20vw] max-h-[240px] min-h-[100px] bg-stone-900 rounded-md"></div>
          <div className="w-full flex flex-col gap-2 relative md:-top-20 -top-12">
            <Avatar className="relative left-5 z-20 md:w-32 md:h-32 w-24 h-24 border-8 border-stone-950">
              <AvatarImage
                src={String(image)}
                alt={`foto de perfil do ${name}`}
              />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
            <div className="w-full flex sm:flex-row flex-col gap-2 justify-between">
              <div className="w-3/4">
                <p className="text-2xl text-ellipsis whitespace-nowrap overflow-hidden flex items-center gap-2">
                  {name}{' '}
                  {verified && (
                    <SealCheck
                      size={20}
                      weight="fill"
                      className="text-sky-500"
                    />
                  )}
                </p>
                <p className="text-sm text-stone-600 text-ellipsis whitespace-nowrap overflow-hidden">
                  @{username}
                </p>
              </div>
              {userLogged.username === users && (
                <EditProfile name={name} username={username} />
              )}
            </div>
          </div>
          <div className="w-full h-auto">
            <Posts posts={posts} user={session.user} />
          </div>
        </>
      )
    }
  }
}
