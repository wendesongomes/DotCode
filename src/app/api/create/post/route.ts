import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

async function CreatePost(request: Request) {
  const { content, id } = await request.json()
  try {
    await prisma.post.create({
      data: {
        content,
        authorId: id,
        published: true,
      },
    })
    return NextResponse.json({ create: 'Criado com sucesso' })
  } catch (error) {
    return NextResponse.json({ error })
  } finally {
    prisma.$disconnect()
  }
}

export { CreatePost as POST, CreatePost as GET }
