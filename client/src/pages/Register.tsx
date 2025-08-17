import { useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import UsernameInput from '../components/UsernameInput'
import clsx from 'clsx'

export default function Register() {
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [username, setUsername] = useState('')
  const [toc, setToc] = useState(false)

  // TODO: Make better check box
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-neutral-900 bg-[url(/mtfuji.png)] bg-cover bg-center transition-all'>
      <div className='flex w-11/12 flex-row rounded-md border-1 border-neutral-700 bg-neutral-800/90 backdrop-blur-xs'>
        <div className='relative hidden w-full flex-1/2 bg-[url(/cyber-city.png)] bg-cover md:block'>
          <div className='h-full w-full backdrop-blur-sm'>
            <h1 className='animate-popin absolute top-1/2 left-1/2 w-full origin-center -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-extrabold text-white'>
              Welcome to CollabPad
            </h1>
          </div>
        </div>
        <div className='mx-2 my-4 flex flex-1/2 flex-col gap-y-4 font-sans text-white'>
          <h1 className='mb-2 text-2xl font-extrabold'>Sign Up</h1>
          <UsernameInput
            username={username}
            setUsername={setUsername}
            label='Username'
            placeholder='Username'
          />
          <PasswordInput
            pass={pass}
            setPass={setPass}
            placeholder='Enter New Pasword'
            label='Create Password'
          />
          <PasswordInput
            pass={confirmPass}
            setPass={setConfirmPass}
            placeholder='Re-Enter your Password'
            label='Confirm Password'
          />
          <div className='mb-[-8px] flex flex-row-reverse items-center justify-end gap-1 text-xs'>
            <label htmlFor='check'>
              I agree to the <strong>Terms and Conditions</strong>
            </label>
            <input
              id='check'
              type='checkbox'
              checked={toc}
              onChange={(e) => setToc(e.target.checked)}
              className='h-5 w-5'
            />
          </div>
          <div className='mt-1 flex items-center justify-around gap-2'>
            <button
              disabled={!toc}
              className={clsx(
                'w-full self-center rounded-lg border-1 border-neutral-50 px-4 py-1 font-bold transition-all',
                {
                  'bg-neutral-100 text-neutral-950 hover:bg-neutral-50': toc,
                  'cursor-not-allowed bg-neutral-700 text-neutral-300': !toc,
                },
              )}>
              Sign Up!
            </button>
            <a
              href='/login'
              className='w-full flex-5/12 rounded-lg px-4 py-1 text-center text-sm font-bold text-neutral-100'>
              Sign in &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
