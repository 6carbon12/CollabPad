import { useState } from 'react'
import { passwordStrength } from 'check-password-strength'
import clsx from 'clsx'
import PasswordInput from '../components/PasswordInput'
import UsernameInput from '../components/UsernameInput'
import PasswordStrenght from '../components/PasswordStrength'
import useToast from '../components/toast/useToast'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [username, setUsername] = useState('')
  const [toc, setToc] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const register = async () => {
    if (username === '') return toast('Username is empty', 'BAD')

    if (password === '') return toast('Password is empty', 'BAD')

    if (confirmPass === '') return toast('Re-enter you password', 'BAD')

    if (password !== confirmPass) {
      toast('Passwords don`t match', 'BAD')
      setConfirmPass('')
      return
    }

    const pStr = passwordStrength(password)
    if (pStr.id < 2) return toast(`Your password is ${pStr.value}`, 'BAD')

    const usrnm = username.toLowerCase()
    const res = await fetch('/API/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usrnm,
        password,
      }),
    })

    if (res.ok) {
      toast('You are now ready to login', 'GOOD')
      navigate('/login')
      return
    }

    switch (res.status) {
      case 409:
        toast(`The username ${usrnm} is taken`, 'BAD')
        break
      case 500:
        toast(`An unknown error occured while creating user`, 'BAD')
        break
    }
  }

  // TODO: Make better check box
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-neutral-900 bg-[url(/mtfuji.png)] bg-cover bg-center transition-all'>
      <div className='flex w-11/12 md:w-8/12 flex-row rounded-md border-1 border-neutral-700 bg-neutral-800/90 backdrop-blur-xs'>
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
          <div>
            <PasswordInput
              pass={password}
              setPass={setPassword}
              placeholder='Enter New Pasword'
              label='Create Password'
            />
            <PasswordStrenght pass={password} />
          </div>
          <PasswordInput
            pass={confirmPass}
            setPass={setConfirmPass}
            placeholder='Re-Enter your Password'
            label='Confirm Password'
            onEnter={register}
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
              )}
              onClick={register}>
              Sign Up!
            </button>
            <a
              href='/login'
              className='w-full flex-5/12 rounded-lg px-4 py-1 text-center text-sm font-bold text-neutral-100'>
              Sign in &rarr;
            </a>
          </div>
          <div className='flex w-full flex-col justify-between'>
            <div className='relative mt-2 mb-4 flex w-full items-center'>
              <p className='w-full text-center text-sm text-neutral-400'>
                OR Register with
              </p>
              <div className='absolute top-1/2 left-1 h-0.5 w-[35%] bg-neutral-400' />
              <div className='absolute top-1/2 right-1 h-0.5 w-[35%] bg-neutral-400' />
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
