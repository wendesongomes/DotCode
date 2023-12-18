import { Like, Post, Saves, User } from '@prisma/client'

interface UserProps extends User {
  likes: Like[]
  saves: Saves[]
}

interface PostProps extends Post {
  author: UserProps
  likes: Like[]
  saves: Saves[]
  childPosts: PostProps[]
}

declare module 'next-auth' {
  interface Session {
    user: UserProps
    post: PostProps[]
    like: Like[]
    allUsers: UserProps[]
    saves: Saves[]
  }
}
