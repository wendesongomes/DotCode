import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Resend } from 'resend'
import EmailTemplate from '@/app/services/emailTemplate'
import { v4 as uuidv4 } from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // await resend.emails.send({
    //   from: 'devcode@resend.dev',
    //   to: email,
    //   subject: 'Confirm your email',
    //   html: '',
    //   react: EmailTemplate({
    //     userFirstname: name,
    //     tokenConfirm: uuidv4().toString(),
    //   }),
    // })

    return NextResponse.json({ create: 'Criado com sucesso' })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && error.meta && error.meta.target) {
        if (Array.isArray(error.meta.target)) {
          console.log(error)
          return NextResponse.json({ error: error.meta.target.join(' ') })
        }
      }
    }
    return NextResponse.json({ error: 'Error server' })
  } finally {
    prisma.$disconnect()
  }
}

export { CreateUser as POST, CreateUser as GET }
