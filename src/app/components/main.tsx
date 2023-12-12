import { Suspense } from 'react'
import { Feed } from './feed/feed'
import { PostForm } from './feed/post/form'
import { Loading } from './feed/loading'

export function Main() {
  return (
    <>
      <PostForm />
      <Suspense fallback={<Loading />}>
        <Feed />
      </Suspense>
    </>
  )
}
