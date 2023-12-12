import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

const prisma = new PrismaClient()

async function CreateUser(request: Request) {
  const { email, name, password, username } = await request.json()

  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password,
        username,
      },
    })

    return NextResponse.json({ create: 'Criado com sucesso' })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && error.meta && error.meta.target) {
        if (Array.isArray(error.meta.target)) {
          console.log({ error: error.meta.target.join(' ') })
          return NextResponse.json({ error: error.meta.target.join(' ') })
        }
      }
    }
  } finally {
    prisma.$disconnect()
  }
}

export { CreateUser as POST, CreateUser as GET }
