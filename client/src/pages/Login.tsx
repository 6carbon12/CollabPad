import { useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import UsernameInput from '../components/UsernameInput'

export default function Login() {
  const [pass, setPass] = useState('')
  const [username, setUsername] = useState('')

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-neutral-900 bg-[url(/mtfuji.png)] bg-cover bg-center transition-all'>
      <div className='flex w-11/12 flex-row rounded-md border-1 border-neutral-700 bg-neutral-800/90 backdrop-blur-xs'>
        <div className='relative hidden w-full flex-1/2 bg-[url(/cyber-city.png)] bg-cover md:block'>
          <div className='h-full w-full backdrop-blur-sm'>
            <h1 className='animate-popin absolute top-1/2 left-1/2 w-full origin-center -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-extrabold text-white'>
              Welcome Back to CollabPad
            </h1>
          </div>
        </div>
        <div className='m-2 flex flex-1/2 flex-col gap-y-3 font-sans text-white'>
          <h1 className='text-2xl font-extrabold'>Sign In</h1>
          <UsernameInput
            username={username}
            setUsername={setUsername}
            label='Username'
            placeholder='Username'
          />
          <PasswordInput
            pass={pass}
            setPass={setPass}
            placeholder='Enter Password'
            label='Password'
          />
          <a
            href='#'
            className='mt-[-8px] mb-2 text-xs text-blue-500 hover:text-blue-400 hover:underline'>
            forgot password?
          </a>
          <div className='mt-1 flex items-center justify-around gap-2'>
            <button
              className={
                'w-full flex-7/12 self-center rounded-lg border-1 border-neutral-50 bg-neutral-100 px-4 py-1 font-bold text-neutral-950 transition-all hover:bg-neutral-200'
              }>
              Sign In
            </button>
            <a
              href='/register'
              className='w-full flex-5/12 rounded-lg px-4 py-1 text-center text-sm font-bold text-neutral-100'>
              Sign up &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
