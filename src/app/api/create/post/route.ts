import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { z } from 'zod'

const prisma = new PrismaClient()

const schema = z.object({
  content: z.string(),
  authorId: z.string().transform(Number),
  parentId: z.string().transform(Number),
})

async function CreatePost(request: Request) {
  const formData = await request.formData()
  const username = formData.get('username')
  const file = formData.get('file')

  const data = Object.fromEntries(formData.entries())

  try {
    const parsed = schema.parse(data)

    if (file) {
      const imageUrl = await put(`${username}/post/${file.name}`, file, {
        access: 'public',
      })

      await prisma.post.create({
        data: {
          ...parsed,
          published: true,
          image: String(imageUrl.url),
        },
      })
    } else {
      await prisma.post.create({
        data: {
          ...parsed,
          published: true,
        },
      })
    }

    return NextResponse.json({ create: 'Criado com sucesso' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  } finally {
    prisma.$disconnect()
  }
}

export { CreatePost as POST, CreatePost as GET }
