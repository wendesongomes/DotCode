import { MagnifyingGlass } from '@phosphor-icons/react'

export function Header() {
  return (
    <header className="h-full w-full my-2 flex lg:gap-10 xl:gap-20 gap-0 xl:justify-center justify-start">
      <div className="top-20 h-full xl:w-2/12 w-auto xl:items-start items-center xl:min-w-[200px] flex flex-col px-4 divide-y divide-stone-900">
        <p>.Code</p>
      </div>

      <div className="h-full w-full lg:w-2/6 sm:min-w-[500px] lg:min-w-[600px] lg:pr-0 pr-4 flex items-center gap-2">
        <MagnifyingGlass size={20} className="text-stone-700" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full outline-none placeholder:text-stone-700 bg-transparent"
        />
      </div>

      <div className="top-20 h-full w-1/5 lg:block hidden"></div>
    </header>
  )
}
