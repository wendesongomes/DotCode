import { PrismaClient } from '@prisma/client'
import { del } from '@vercel/blob'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

async function DeletePost(request: Request) {
  const { id, image } = await request.json()
  try {
    if (image !== 'null') {
      await del(image)
    }
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
    console.log(error)
    return NextResponse.json({ error })
  } finally {
    prisma.$disconnect()
  }
}

export { DeletePost as POST, DeletePost as GET }
