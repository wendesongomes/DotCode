import { Button } from '@/app/components/authenticate/button'
import { Divide } from '@/app/components/authenticate/divide'
import { FormLogin } from '@/app/components/authenticate/login/form'
import { MessageAccount } from '@/app/components/authenticate/messageAccount'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DotCode | Login',
}

export default function Login() {
  return (
    <>
      <h1 className="sm:text-5xl text-4xl font-semibold">Welcome Back!</h1>
      <FormLogin />

      <Divide>or</Divide>

      <MessageAccount href="/register" highlightedText="Register now">
        Dont have an account?
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
