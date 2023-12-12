import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

interface FormProps {
  name: string
  username: string
}

export function EditProfile({
  name,
  username,
}: {
  name: string
  username: string
}) {
  const [ErrorUsernameExisting, setErrorUsernameExisting] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const schema = z
    .object({
      name: z.string().min(1, { message: 'Name is required' }),
      username: z
        .string()
        .toLowerCase()
        .min(1, { message: 'Username is required' }),
    })
    .refine((fields) => /^[a-zA-Z0-9]+$/.test(fields.username), {
      path: ['username'],
      message: 'the username cannot contain special characters or spaces',
    })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  })

  const { data: session, update } = useSession()

  if (session) {
    const { id } = session.user

    const onSubmit: SubmitHandler<FormProps> = async ({ name, username }) => {
      const updateUser = await fetch('/api/update/user', {
        method: 'POST',
        body: JSON.stringify({
          name,
          username,
          id,
        }),
      })
      await update()

      if (updateUser.ok) {
        const { error } = await updateUser.json()
        setErrorUsernameExisting(error)

        if (!error) {
          router.push(`/${username}`)
          setOpen(ErrorUsernameExisting === '')
        }
      }
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          className="px-2 py-1 border border-stone-800 rounded-md text-sm"
        >
          <button>Edit Profile</button>
        </DialogTrigger>
        <DialogContent className="w-full sm:h-auto h-screen bg-black text-stone-100 border-none">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="sm:grid gap-4 py-4 w-full h-full flex flex-col justify-center items-center"
          >
            <div className="gap-4 py-4 w-full h-full flex flex-col sm:items-end items-center">
              <div className="flex sm:flex-row flex-col sm:items-center items-start gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <div>
                  <input
                    id="name"
                    defaultValue={name}
                    {...register('name')}
                    className="col-span-3 bg-transparent border border-stone-800 rounded-md p-2 outline-none "
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex sm:flex-row flex-col sm:items-center items-start gap-4">
                <label htmlFor="username" className="text-right">
                  Username
                </label>
                <div className="flex flex-col w-full">
                  <input
                    id="username"
                    defaultValue={username}
                    {...register('username')}
                    onChange={() => setErrorUsernameExisting('')}
                    className="col-span-3 bg-transparent border border-stone-800 rounded-md p-2 outline-none"
                  />
                  {ErrorUsernameExisting === 'username' ? (
                    <p className="text-xs text-red-500">
                      Username already registered
                    </p>
                  ) : (
                    errors.username?.message && (
                      <p className="text-xs text-red-500">
                        {errors.username.message}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <button
                type="submit"
                className="px-2 py-2 border border-stone-800 rounded-md"
              >
                {isSubmitting ? 'Saving....' : 'Save changes'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
}
