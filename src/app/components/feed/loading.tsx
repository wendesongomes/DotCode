import { SpinnerGap } from '@phosphor-icons/react'

export function Loading() {
  return (
    <div className="w-full h-10 flex justify-center items-center">
      <SpinnerGap size={30} weight="bold" className="animate-spin mt-10" />
    </div>
  )
}
