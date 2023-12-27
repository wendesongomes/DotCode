import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowClockwise,
  ImageSquare,
  PaperPlaneRight,
  XCircle,
} from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
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
  activeImages?: boolean | true
}

export function PostForm({
  placeholder,
  url,
  postId,
  enableUpdate,
  onCloseModal,
  activeImages,
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
  const [selectedImage, setSelectedImage] = useState<File | string>('')

  if (session) {
    const { id, username } = session.user
    const autoResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (event.target.value === '') {
        setTextareaHeight(60)
      } else {
        setTextareaHeight(event.target.scrollHeight - 30)
      }
    }

    const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0])
      }
    }

    const blob = new Blob([selectedImage], { type: 'image/*' })

    const onSubmit: SubmitHandler<FormProps> = async ({ content }) => {
      const formData = new FormData()
      formData.append('file', selectedImage)
      formData.append('content', content)
      formData.append('authorId', String(id))
      formData.append('parentId', String(postId))
      formData.append('username', username)

      await fetch(url, {
        method: 'POST',
        body: formData,
      })
      if (enableUpdate) await update()
      reset()
      setCloseModal(true)
      if (onCloseModal) {
        onCloseModal(closeModal)
      }
    }

    const disabledTextArea =
      errors.content?.type !== 'too_small' && errors.content !== undefined

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="rounded-md h-auto bg-stone-900 pb-6 min-h-[60px]">
          <textarea
            {...register('content')}
            disabled={disabledTextArea}
            onInput={autoResize}
            style={{ height: `${textareaHeight}px` }}
            className="w-full h-auto resize-none max-h-[401px] pt-4 min-h-[60px] rounded-md bg-stone-900 outline-none px-4  placeholder:text-stone-700"
            placeholder={placeholder}
          />
          {selectedImage && (
            <div className="px-4">
              <XCircle
                size={20}
                className="relative top-6 left-1 cursor-pointer"
                onClick={() => setSelectedImage('')}
              />
              <Image
                width={600}
                height={600}
                src={URL.createObjectURL(blob)}
                alt=""
                className="rounded-md"
              />
            </div>
          )}
        </div>
        <div className="relative w-full h-10 bg-stone-800 bottom-3 rounded-b-md flex justify-between items-center px-4">
          <div>
            {activeImages && (
              <label htmlFor="file-input" className="cursor-pointer">
                <ImageSquare size={20} weight="duotone" alt="" />
              </label>
            )}
            <input
              type="file"
              accept="image/*"
              id="file-input"
              className="hidden"
              onChange={imageChange}
            />
          </div>
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
