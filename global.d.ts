import { Like, Post, User } from "@prisma/client"


interface UserProps extends User {
  likes: Like[]
}

interface PostProps extends Post {
  author: UserProps
  likes: Like[]
}

declare module 'next-auth' {
  interface Session {
    user: UserProps
    post: PostProps[]
    like: Like[]
    allUsers: UserProps[]
  }
}
