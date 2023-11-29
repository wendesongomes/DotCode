'use client'

import { Eye, EyeClosed } from '@phosphor-icons/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface FormProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const schema = z
  .object({
    name: z.string().min(1, { message: 'Nome é obrigatorio' }),
    email: z
      .string()
      .min(1, { message: 'Email é obrigatorio' })
      .email({ message: 'Tem que ser um email' }),
    password: z.string().min(6, { message: 'No minimo 6 characteres' }),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas tem que ser iguais',
  })

export function Form() {
  const [viewPassword, setViewPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormProps> = (data) => console.log(data)

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="w-2/4">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Name"
          {...register('name')}
          className="p-2 border rounded-lg text-sm font-medium outline-none"
        />
        {errors.name?.message && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
        <input
          type="text"
          {...register('email')}
          placeholder="Email"
          className="p-2 border rounded-lg text-sm font-medium outline-none"
        />
        {errors.email?.message && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
        <div className="flex flex-col p-1 border rounded-lg divide-y-2">
          <div className="flex">
            <input
              type={viewPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Password"
              className="p-2 text-sm font-medium outline-none w-full"
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
          <input
            type={viewPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            placeholder="Confirm Password"
            className="p-2 text-sm font-medium outline-none"
          />
        </div>
        {errors.password?.message && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
        {errors.confirmPassword?.message && (
          <p className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
        <button className="bg-stone-900 p-3 rounded-lg text-white/90 text-sm outline-none hover:bg-stone-950 transition-all duration-200">
          Create Account
        </button>
      </div>
    </form>
  )
}
