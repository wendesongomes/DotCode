import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

async function UpdateUser(request: Request) {
  const { name, username, id } = await request.json()

  try {
    await prisma.user.update({
      where: { id },
      data: {
        username,
        name,
      },
    })

    return NextResponse.json({ message: 'update' })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && error.meta && error.meta.target) {
        if (Array.isArray(error.meta.target)) {
          return NextResponse.json({ error: error.meta.target.join(' ') })
        }
      }
    }
  } finally {
    prisma.$disconnect()
  }
}

export { UpdateUser as GET, UpdateUser as POST }
