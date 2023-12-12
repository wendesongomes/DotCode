import NextAuth from 'next-auth/next'
import { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { v4 as uuidv4 } from 'uuid'
import { ExistingEmail } from '../../create/user/route'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        const userPrisma = await prisma.user.findUnique({
          where: { email: String(user.email) },
        })
        return {
          ...token,
          admin: userPrisma?.admin,
        }
      }
      return token
    },
    async session({ session }) {
      const userPrisma = await prisma.user.findUnique({
        where: { email: String(session.user?.email) },
        include: {
          likes: true,
        },
      })
      const allUsers = await prisma.user.findMany()
      const userPost = await prisma.post.findMany({
        where: {
          authorId: session.user.id,
        },
      })
      const post = await prisma.post.findMany({
        orderBy: { id: 'desc' },
        include: { author: true, likes: true },
      })
      const like = await prisma.like.findMany({
        include: { post: true },
      })

      if (userPrisma) {
        return {
          ...session,
          user: {
            id: userPrisma.id,
            username: userPrisma.username,
            name: userPrisma.name,
            verified: userPrisma.verified,
            admin: userPrisma.admin,
            email: userPrisma.email,
            image: userPrisma.image,
            createAt: userPrisma.createdAt,
            updatedAt: userPrisma.updatedAt,
            likes: userPrisma.likes,
          },
          post,
          like,
          allUsers,
        }
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        const randomPassword = uuidv4().substring(0, 24)
        if (await ExistingEmail(String(user?.email))) {
          await prisma.user.create({
            data: {
              username: String(user.name?.split(/[,\s]+/).join('') + user.id),
              provider: account?.provider,
              email: String(user.email),
              name: String(user.name),
              image: String(user.image),
              password: randomPassword,
            },
          })
        }
        return true
      }
      return true
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const prismaUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })

        const user = {
          id: String(prismaUser?.id),
          name: prismaUser?.name,
          password: prismaUser?.password,
          email: prismaUser?.email,
        }

        if (user && user.password === credentials?.password) {
          return user
        }

        return null
      },
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
