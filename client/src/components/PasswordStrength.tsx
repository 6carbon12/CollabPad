import clsx from 'clsx'
import { useState } from 'react'
import { passwordStrength } from 'check-password-strength'

export default function PasswordStrenght({ pass }: { pass: string }) {
  const [strenght, setStrength] = useState(0)
  setTimeout(() => {
    const str = passwordStrength(pass).id
    setStrength(str)
  }, 0)
  return (
    <div className='relative bg-neutral-500 w-full h-1 mt-2 rounded-sm'>
      <div
        title='Password Strenght'
        className={clsx(
          'absolute z-50 top-0 h-1 transition-all duration-300 rounded-sm',
          pass.length === 0 ? 'w-[0px]' : '',
          {
            'w-1/12 bg-red-800': strenght == 0,
            'w-2/5 bg-red-500': strenght == 1,
            'w-2/3 bg-yellow-500': strenght == 2,
            'w-full bg-green-500': strenght == 3,
          },
        )}></div>
    </div>
  )
}
