/// <reference types="next" />
/// <reference types="next/image-types/global" />

import { Like, Post, User } from '@prisma/client'

interface UserProps extends User {
  likes: Like[]
}

interface PostProps extends Post {
  author: User
  likes: Like[]
}

declare module 'next-auth' {
  interface Session {
    user: UserProps
    post: PostProps[]
    like: Like[]
    allUsers: User[]
  }
}
