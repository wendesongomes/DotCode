import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const ExistingEmail = async (email: string) => {
  const verifyEmail = await prisma.user.findUnique({ where: { email } })
  if (verifyEmail === null) {
    return true
  }
}