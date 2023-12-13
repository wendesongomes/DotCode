import { Button } from '@/app/components/authenticate/button'
import { Divide } from '@/app/components/authenticate/divide'
import { MessageAccount } from '@/app/components/authenticate/messageAccount'
import { FormRegister } from '@/app/components/authenticate/login/register/form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DotCode | Register',
}

export default function Register() {
  return (
    <>
      <h1 className="sm:text-5xl text-4xl font-semibold">Welcome Back!</h1>
      <FormRegister />

      <Divide>or</Divide>

      <MessageAccount href="/login" highlightedText="sign In">
        Already have an account?
      </MessageAccount>

      <div className="sm:w-2/4 w-3/4 flex flex-col gap-2">
        <Button providers="google" alt="Google Logo" url="/google.svg">
          Continue with Google
        </Button>
        <Button providers="github" alt="Google Logo" url="/github.png">
          Continue with Github
        </Button>
      </div>
    </>
  )
}
