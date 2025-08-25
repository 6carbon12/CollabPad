import { useState, type ReactNode } from 'react'
import { ToastContext } from './ToastContext'
import clsx from 'clsx'

type Toast = {
  id: `${string}-${string}-${string}-${string}`
  message: string
  type: 'GOOD' | 'BAD'
  removing: boolean
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  function addToast(message: string, type: 'GOOD' | 'BAD') {
    const id = crypto.randomUUID() // Date.now() breaks if a pair of same second toasts are called twice in 3s
    setToasts((t) => [...t, { id, message, type, removing: false }])
    setTimeout(() => {
      setToasts((pt) =>
        pt.map((t) => (t.id === id ? { ...t, removing: true } : t)),
      )

      setTimeout(() => {
        setToasts((pt) => pt?.filter((t) => t.id !== id))
      }, 500)
    }, 3000)
  }

  // TODO: Create better toast with timer bar and make it more discreet
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        id='toastContainer'
        className='fixed top-4 right-4 left-4 flex flex-col items-center gap-2 transition-all'>
        {toasts?.map((t) => (
          <div
            key={t.id}
            className={clsx(
              'z-50 h-3/4 w-4/5 transform rounded-sm px-4 py-2 text-white shadow-md transition-all duration-500 md:h-full md:text-lg',
              t.type === 'GOOD' ? 'bg-green-500' : 'bg-red-500',
              t.removing
                ? '-translate-y-full scale-0 opacity-0'
                : 'animate-toastIn',
            )}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
