import { Perfil } from '@/app/components/perfil'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DotCode',
}

export default function Page({ params }: { params: { users: string } }) {
  return <Perfil users={params.users} />
}
