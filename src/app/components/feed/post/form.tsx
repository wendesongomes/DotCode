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

interface PostFormProps {
  placeholder: string
  url: string
  postId?: number
  enableUpdate?: boolean
  onCloseModal?: (isClosed: boolean) => void
}

export function PostForm({
  placeholder,
  url,
  postId,
  enableUpdate,
  onCloseModal,
}: PostFormProps) {
  const { data: session, update } = useSession()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof schema>>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      content: '',
    },
  })
  const [textareaHeight, setTextareaHeight] = useState<number>(60)
  const [closeModal, setCloseModal] = useState(false)

  if (session) {
    const { id } = session.user
    const autoResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaHeight(event.target.scrollHeight)
    }

    const onSubmit: SubmitHandler<FormProps> = async ({ content }) => {
      const createPost = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          content,
          id,
          postId,
        }),
      })
      if (enableUpdate) await update()
      reset()
      if (!createPost.ok) {
        const { error } = await createPost.json()
        console.error('error:', error)
      } else {
        setCloseModal(true)

        if (onCloseModal) {
          onCloseModal(closeModal)
        }
      }
    }

    const disabledTextArea =
      errors.content?.type !== 'too_small' && errors.content !== undefined

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <textarea
          {...register('content')}
          disabled={disabledTextArea}
          onInput={autoResize}
          style={{ height: `${textareaHeight}px` }}
          className="w-full max-h-[400px] resize-none rounded-md bg-stone-900 outline-none p-4 placeholder:text-stone-700"
          placeholder={placeholder}
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
    )
  }
}
