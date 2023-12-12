import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowClockwise, PaperPlaneRight } from '@phosphor-icons/react'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface FormProps {
  content: string
}

const schema = z.object({
  content: z.string().min(1),
})

export function PostForm() {
  const { data: session, update } = useSession()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: zodResolver(schema),
  })
  const [textareaHeight, setTextareaHeight] = useState<number>(60)

  if (session) {
    const { id } = session.user
    const autoResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaHeight(event.target.scrollHeight)
    }

    const onSubmit: SubmitHandler<FormProps> = async ({ content }) => {
      const createPost = await fetch('/api/create/post', {
        method: 'POST',
        body: JSON.stringify({
          content,
          id,
        }),
      })
      await update()
      reset()
      if (!createPost.ok) {
        const { error } = await createPost.json()
        console.error('error:', error)
      }
    }

    const disabledTextArea = errors.content !== undefined

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register('content')}
            disabled={disabledTextArea}
            onInput={autoResize}
            style={{ height: `${textareaHeight}px` }}
            className="w-full max-h-[400px] resize-none rounded-md bg-stone-900 outline-none p-4 placeholder:text-stone-700"
            placeholder="New Post"
          />
          <div className="relative w-full h-10 bg-stone-800 bottom-3 rounded-b-md flex justify-between items-center px-4">
            <div></div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <ArrowClockwise
                  size={20}
                  weight="fill"
                  className="animate-spin"
                />
              ) : (
                <PaperPlaneRight
                  size={20}
                  weight="fill"
                  className={`${disabledTextArea && 'text-white/20'}`}
                />
              )}
            </button>
          </div>
        </form>
      </>
    )
  }
}
