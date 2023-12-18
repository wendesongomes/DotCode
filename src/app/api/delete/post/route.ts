import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

async function DeletePost(request: Request) {
  const { id } = await request.json()
  try {
    await prisma.saves.deleteMany({
      where: {
        postId: id,
      },
    })
    await prisma.post.deleteMany({
      where: {
        id,
      },
    })
    return NextResponse.json({ create: 'Deletado com sucesso' })
  } catch (error) {
    return NextResponse.json({ error })
  } finally {
    prisma.$disconnect()
  }
}

export { DeletePost as POST, DeletePost as GET }
