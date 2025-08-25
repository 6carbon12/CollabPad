import { useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import UsernameInput from '../components/UsernameInput'
import useToast from '../components/toast/useToast'

export default function Login() {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const toast = useToast()
  const login = async () => {
    if (!username) return toast('Username empty', 'BAD')
    if (!password) return toast('Password empty', 'BAD')

    const usrnm = username.toLowerCase()
    const res = await fetch('/API/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usrnm,
        password,
      }),
    })

    if (res.ok) return toast('Login Successful', 'GOOD')

    switch (res.status) {
      case 401:
        return toast('Password Incorrect', 'BAD')
      case 404:
        return toast('Username not found', 'BAD')
      case 500:
      default:
        return toast('An Unkown Error Occured', 'BAD')
    }
  }
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-neutral-900 bg-[url(/mtfuji.png)] bg-cover bg-center transition-all'>
      <div className='flex w-11/12 md:w-8/12 flex-row rounded-md border-1 border-neutral-700 bg-neutral-800/90 backdrop-blur-xs'>
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
            pass={password}
            setPass={setPassword}
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
              }
              onClick={login}>
              Sign In
            </button>
            <a
              href='/register'
              className='w-full flex-5/12 rounded-lg px-4 py-1 text-center text-sm font-bold text-neutral-100'>
              Sign up &rarr;
            </a>
          </div>
          <div className='flex w-full flex-col justify-between'>
            <div className='relative mt-2 mb-4 flex w-full items-center'>
              <p className='w-full text-center text-sm text-neutral-400'>
                OR Login with
              </p>
              <div className='absolute top-1/2 left-1 z-0 h-[1px] w-[35%] bg-neutral-400' />
              <div className='absolute top-1/2 right-1 z-0 h-[1px] w-[35%] bg-neutral-400' />
            </div>
            <div className='flex h-13 w-1/4 justify-around gap-8 self-center'>
              <button className='flex h-10 w-10 rounded-md border-1 border-neutral-50 bg-neutral-100 p-1 font-bold text-neutral-950 transition-all hover:bg-neutral-200'>
                <img
                  src='https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw'
                  alt='Google'
                  className='w-full self-center'
                />
              </button>
              <button className='flex h-10 w-10 rounded-md border-1 border-neutral-50 bg-neutral-100 p-1 font-bold text-neutral-950 transition-all hover:bg-neutral-200'>
                <img
                  src='https://static.xx.fbcdn.net/rsrc.php/yx/r/iZuqWRnx4yU.ico'
                  alt='Google'
                  className='w-full self-center'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
