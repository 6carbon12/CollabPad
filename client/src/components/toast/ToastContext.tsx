import { createContext } from 'react'

export type ToastContext = {
  addToast: (msg: string, type: 'GOOD' | 'BAD') => void
}
export const ToastContext = createContext<ToastContext | undefined>(undefined)
