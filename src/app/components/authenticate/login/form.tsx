'use client'

import { Eye, EyeClosed } from '@phosphor-icons/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface FormProps {
  email: string
  password: string
}

const schema = z.object({
  email: z
    .string()
    .toLowerCase()
    .min(1, { message: 'Email is required' })
    .email({ message: 'It has to be an email' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export function FormLogin() {
  const [viewPassword, setViewPassword] = useState(false)
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormProps> = async ({ email, password }) => {
    await signIn('credentials', {
      redirect: false,
      email,
      password,
    }).then((response) => {
      if (response && response.error) {
        setIsError(true)
      } else {
        router.push('/')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:w-2/4 w-3/4 ">
      <div className="flex flex-col gap-2">
        <input
          type="email"
          id="email"
          {...register('email')}
          onChange={() => setIsError(false)}
          placeholder="Email"
          className="p-2 border rounded-lg text-sm font-medium outline-none"
        />
        {errors.email?.message && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
        <div className="flex p-1 border rounded-lg text-sm font-medium outline-none">
          <input
            type={viewPassword ? 'text' : 'password'}
            id="password"
            {...register('password')}
            onChange={() => setIsError(false)}
            placeholder="Password"
            className="text-sm px-1 font-medium outline-none w-full"
          />
          {viewPassword ? (
            <EyeClosed
              size={32}
              weight="light"
              className="text-black/20 cursor-pointer"
              onClick={() => setViewPassword(!viewPassword)}
            />
          ) : (
            <Eye
              size={32}
              weight="light"
              className="text-black/20 cursor-pointer"
              onClick={() => setViewPassword(!viewPassword)}
            />
          )}
        </div>
        {errors.password?.message && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
        {isError && (
          <p className="text-xs text-red-500">Invalid email or password</p>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className={`p-3 rounded-lg text-white/90 text-sm outline-none hover:bg-stone-950 transition-all duration-200 ${
            isSubmitting ? 'bg-stone-400' : 'bg-stone-900'
          }`}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  )
}
