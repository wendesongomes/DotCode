'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { TrashSimple } from '@phosphor-icons/react'
import { DotsThreeOutline } from '@phosphor-icons/react/dist/ssr'
import { useSession } from 'next-auth/react'

export default function Users() {
  const { data: session } = useSession()
  if (session) {
    if (session.allUsers) {
      const users = session.allUsers
      return (
        <div className="h-full w-full lg:w-2/6 divide-y divide-stone-800 sm:min-w-[500px] lg:min-w-[600px] pr-10 flex flex-col gap-3">
          {users.map((user) => (
            <div key={user.id} className="flex py-2 justify-between">
              <div className="flex gap-2 items-center ">
                <Avatar>
                  <AvatarImage src={String(user.image)} />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
                <div>
                  <p>{user.name}</p>
                  <p className="text-xs text-stone-600">{user.email}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <DotsThreeOutline
                    size={20}
                    weight="fill"
                    className="text-white"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2 rounded-md mt-2 border border-stone-800 bg-transparent">
                  <DropdownMenuItem className="outline-none flex gap-2 text-red-500 hover:bg- justify-center items-center text-sm p-1 rounded-md transition-all duration-150 cursor-pointer">
                    <TrashSimple size={20} weight="fill" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )
    }
  }

  return null
}
