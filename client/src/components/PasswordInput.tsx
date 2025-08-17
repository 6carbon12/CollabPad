import { useState } from 'react'
import closedEyeIcon from '../assets/closedEye.svg'
import openEyeIcon from '../assets/openEye.svg'

type props = {
  pass: string
  setPass: (newPass: string) => void
  label: string
  placeholder?: string
  onEnter?: () => void
}

export default function PasswordInput({
  pass,
  setPass,
  label,
  placeholder,
  onEnter,
}: props) {
  const [type, setType] = useState('password')
  function handleKeyDown(key: string) {
    if (!onEnter) {
      return
    }

    switch (key) {
      case 'Enter':
        onEnter()
        break
    }
  }
  return (
    <div className='relative'>
      <label htmlFor='password' className='mb-1 text-sm text-neutral-300'>
        {label}:
      </label>
      <input
        id='password'
        className='w-full rounded-sm border-1 border-neutral-600 bg-neutral-700 px-2 py-1 font-sans text-sm outline-none focus:border-neutral-500'
        value={pass}
        type={type}
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e.key)}
        onChange={(e) => setPass(e.target.value)}
      />
      <button
        className='absolute top-7.5 right-1.5'
        tabIndex={-1}
        onClick={() => {
          setType(type == 'password' ? 'text' : 'password')
        }}>
        <img
          src={type == 'password' ? openEyeIcon : closedEyeIcon}
          alt='EYE'
          height={20}
          width={20}
          className='text-white'
        />
      </button>
    </div>
  )
}
