type props = {
  username: string
  setUsername: (newUserName: string) => void
  label: string
  placeholder?: string
}

export default function UsernameInput({
  username,
  setUsername,
  label,
  placeholder,
}: props) {
  return (
    <div className='flex flex-col'>
      <label htmlFor='username' className='mb-1 text-sm text-neutral-300'>
        {label}:
      </label>
      <input
        id='username'
        className='w-full rounded-sm border-1 border-neutral-600 bg-neutral-700 px-2 py-1 font-sans text-sm outline-none focus:border-neutral-500'
        autoComplete='new-password'
        value={username}
        placeholder={placeholder}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  )
}
