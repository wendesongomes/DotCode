import { Feed } from './feed/feed'
import { PostForm } from './post/form'

export function Main() {
  return (
    <main className="h-full w-full lg:w-2/6 sm:min-w-[500px] lg:min-w-[600px] lg:pr-0 pr-10">
      <PostForm />
      <Feed />
    </main>
  )
}
