import {
  BellSimple,
  BookmarkSimple,
  ChatText,
  DotsThreeCircle,
  SignOut,
  User,
  UserCircle,
  UserList,
  Users,
} from '@phosphor-icons/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { House } from '@phosphor-icons/react/dist/ssr'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Nav() {
  const { data: session, update } = useSession()
  const path = usePathname()

  const reload = async () => {
    await update()
  }

  if (session) {
    const { name, image, username, admin } = session.user

    return (
      <nav className="sticky top-5 h-full xl:w-2/12 w-auto xl:min-w-[200px] xl:items-start items-center flex flex-col px-4 divide-y divide-stone-900">
        <ul className="flex flex-col gap-4 pb-5 w-full max-w-[240px] xl:items-start items-center">
          <li>
            {path === '/home' ? (
              <button
                onClick={() => reload()}
                className={`text-amber-500 flex items-center gap-2`}
              >
                <House size={20} weight="fill" />
                <p className="xl:block hidden">My Feed</p>
              </button>
            ) : (
              <Link
                onClick={() => reload()}
                href="/home"
                className={`flex items-center gap-2`}
              >
                <House size={20} weight="fill" />
                <p className="xl:block hidden">My Feed</p>
              </Link>
            )}
          </li>
          <li>
            <Link href="" className="flex items-center gap-2 text-stone-800">
              <Users size={20} weight="fill" />
              <p className="xl:block hidden">Groups</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center gap-2 text-stone-800">
              <ChatText size={20} weight="fill" />
              <p className="xl:block hidden">Messages</p>
            </Link>
          </li>
          <li>
            <Link
              href="/i/saves"
              onClick={() => reload()}
              className={`${
                path === `/i/saves` && 'text-amber-500'
              } flex items-center gap-2`}
            >
              <BookmarkSimple size={20} weight="fill" />
              <p className="xl:block hidden">Saves</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center gap-2 text-stone-800">
              <DotsThreeCircle size={20} weight="fill" />
              <p className="xl:block hidden">More</p>
            </Link>
          </li>
        </ul>

        <ul className="flex flex-col xl:items-start items-center gap-4 py-5 w-full max-w-[240px]">
          <li>
            <Link
              href={`/${username}`}
              className={`${
                path === `/${username}` && 'text-amber-500'
              } flex items-center gap-2`}
            >
              <User size={20} weight="fill" />
              <p className="xl:block hidden">Perfil</p>
            </Link>
          </li>
          <li>
            <Link href="" className="flex items-center gap-2 text-stone-800">
              <BellSimple size={20} weight="fill" />
              <p className="xl:block hidden">Notifications</p>
            </Link>
          </li>
        </ul>

        <ul className="flex pt-5 w-full max-w-[240px]">
          <li className="w-full flex xl:flex-row flex-col items-center justify-between gap-4">
            <Link href="" className="flex gap-4 items-center">
              {image === null ? (
                <UserCircle size={40} weight="fill" />
              ) : (
                <Avatar>
                  <AvatarImage src={image} />
                  <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
              )}
              <div className="xl:flex hidden max-w-[150px] flex-col ">
                <p className="text-ellipsis whitespace-nowrap overflow-hidden">
                  {name?.split(' ')[0]}{' '}
                  {name?.split(' ')[1] && name?.split(' ')[1].charAt(0) + '.'}
                </p>
                <p className="text-sm text-stone-700 text-ellipsis whitespace-nowrap overflow-hidden">
                  @{username}
                </p>
              </div>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <DotsThreeCircle
                  size={20}
                  weight="fill"
                  className="text-white"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 rounded-md mt-2 border border-stone-800">
                {admin && (
                  <Link href="/admin/users">
                    <DropdownMenuItem className="outline-none flex gap-2 items-center text-sm hover:bg-stone-600 p-1 rounded-md transition-all duration-150 cursor-pointer">
                      <UserList size={18} weight="fill" />
                      Users
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem
                  className="outline-none cursor-pointer flex gap-2 items-center text-sm hover:bg-stone-600 p-1 rounded-md transition-all duration-150"
                  onClick={() => signOut()}
                >
                  <SignOut size={18} weight="fill" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    )
  }
}
