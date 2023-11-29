'use client'

import { Aside } from '../components/Register/aside'
import { Button } from '../components/Register/button'
import { Divide } from '../components/Register/divide'
import { Form } from '../components/Register/form'
import { Sign } from '../components/Register/sign'

export default function Register() {
  return (
    <main className="w-screen h-screen flex justify-center items-center p-2 overflow-hidden">
      <Aside />
      <div className="h-full md:w-2/4 w-5/6 min-w-[600px] flex flex-col justify-center items-center gap-8">
        <h1 className="sm:text-5xl text-4xl font-semibold">Welcome Back!</h1>
        <Form />

        <Divide>or</Divide>

        <Sign href="/login" highlightedText="sign In">
          Already have an account?
        </Sign>

        <div className="w-2/4 flex flex-col gap-2">
          <Button alt="Google Logo" url="/google.svg">
            Continue with Google
          </Button>
          <Button alt="Apple Logo" url="/apple.svg">
            Continue with Apple
          </Button>
          <Button alt="Twitter Logo" url="/twitter.svg">
            Continue with Twitter
          </Button>
        </div>
      </div>
    </main>
  )
}
