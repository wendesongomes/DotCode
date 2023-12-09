import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

async function Like(request: Request) {
  const { userId, postId } = await request.json()

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  })

  if (existingLike) {
    await prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })
    return new NextResponse()
  } else {
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    })
    return new NextResponse()
  }
}

export { Like as GET, Like as POST }
