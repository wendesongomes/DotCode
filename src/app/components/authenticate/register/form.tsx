'use client'

import { Eye, EyeClosed } from '@phosphor-icons/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

interface FormProps {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface PasswordRulesProps {
  characters: boolean | undefined
  Numbers: boolean | undefined
  characterLowerUppercase: boolean | undefined
  characterSpecial: boolean | undefined
  PasswordsSame: boolean | undefined
}

export function FormRegister() {
  const [viewPassword, setViewPassword] = useState(false)
  const [alreadyRegistered, setAlreadyRegistered] = useState('')
  const [passwordRules, setPasswordRules] = useState<PasswordRulesProps>({
    characters: undefined,
    Numbers: undefined,
    characterLowerUppercase: undefined,
    characterSpecial: undefined,
    PasswordsSame: undefined,
  })
  const router = useRouter()

  const schema = z
    .object({
      name: z.string().min(1, { message: 'Name is required' }),
      username: z.string().min(1, { message: 'Username is required' }),
      email: z
        .string()
        .toLowerCase()
        .min(1, { message: 'Email is required' })
        .email({ message: 'It has to be an email' }),
      password: z.string().min(8, { message: 'minimum 8 characters' }),
      confirmPassword: z.string(),
    })
    .refine((fields) => /^[a-zA-Z0-9]+$/.test(fields.username), {
      path: ['username'],
      message: 'the username cannot contain special characters or spaces',
    })
    .refine((fields) => {
      setPasswordRules({
        characters: fields.password.length > 8,
        Numbers: /\d/.test(fields.password),
        characterLowerUppercase:
          /[a-z]/.test(fields.password) && /[A-Z]/.test(fields.password),
        characterSpecial: /[^a-zA-Z0-9]/.test(fields.password),
        PasswordsSame:
          fields.password === fields.confirmPassword &&
          fields.password.length > 1,
      })
      if (Object.values(passwordRules).every((valor) => valor === true))
        return true
    })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const createUser = await fetch('/api/create/user', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (createUser.ok) {
      const { error } = await createUser.json()
      setAlreadyRegistered(error)
      console.log(error)
      if (!error) {
        router.push('/login')
      }
    }

    console.log(createUser.status)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-2/4">
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
          placeholder="Username"
          {...register('username')}
          onChange={() => setAlreadyRegistered('')}
          className="p-2 border rounded-lg text-sm font-medium outline-none"
        />
        {alreadyRegistered === 'username' ? (
          <p className="text-xs text-red-500">Username already registered</p>
        ) : (
          errors.username?.message && (
            <p className="text-xs text-red-500">{errors.username.message}</p>
          )
        )}

        <input
          type="text"
          {...register('email')}
          onChange={() => setAlreadyRegistered('')}
          placeholder="Email"
          className="p-2 border rounded-lg text-sm font-medium outline-none "
        />
        {alreadyRegistered === 'email' ? (
          <p className="text-xs text-red-500">Email already registered</p>
        ) : (
          errors.email?.message && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )
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
        <div className="text-xs">
          <p
            className={`${
              passwordRules.characters === undefined
                ? 'text-stone-400'
                : passwordRules.characters
                  ? 'text-green-600'
                  : 'text-red-400'
            }`}
          >
            Contain 8 Characters
          </p>
          <p
            className={`${
              passwordRules.characterLowerUppercase === undefined
                ? 'text-stone-400'
                : passwordRules?.characterLowerUppercase
                  ? 'text-green-600'
                  : 'text-red-400'
            }`}
          >
            Contain both lower and uppercase letters
          </p>
          <p
            className={`${
              passwordRules.Numbers === undefined
                ? 'text-stone-400'
                : passwordRules.Numbers
                  ? 'text-green-600'
                  : 'text-red-400'
            }`}
          >
            Contain 1 number
          </p>
          <p
            className={`${
              passwordRules.characterSpecial === undefined
                ? 'text-stone-400'
                : passwordRules.characterSpecial
                  ? 'text-green-600'
                  : 'text-red-400'
            }`}
          >
            Contain 1 special character -!@#$%^&*+
          </p>
          <p
            className={`${
              passwordRules.PasswordsSame === undefined
                ? 'text-stone-400'
                : passwordRules.PasswordsSame
                  ? 'text-green-600'
                  : 'text-red-400'
            }`}
          >
            Passwords must be the same
          </p>
        </div>
        <button
          disabled={isSubmitting}
          className={`p-3 rounded-lg text-white/90 text-sm outline-none hover:bg-stone-950 transition-all duration-200 ${
            isSubmitting ? 'bg-stone-400' : 'bg-stone-900'
          }`}
          type="submit"
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  )
}
