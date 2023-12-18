import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

async function SavePost(request: Request) {
  const { userId, postId } = await request.json()

  const existingSaves = await prisma.saves.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  })

  if (existingSaves) {
    await prisma.saves.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })

    return new NextResponse()
  } else {
    await prisma.saves.create({
      data: {
        userId,
        postId,
      },
    })
    return new NextResponse()
  }
}

export { SavePost as POST, SavePost as GET }
