import { useContext } from 'react'
import { ToastContext } from './ToastContext'

export default function useToast(): (
  msg: string,
  type: 'GOOD' | 'BAD',
) => void {
  const ctx = useContext(ToastContext)

  if (!ctx) throw new Error('useToast can only be used in ToastProvider')

  return ctx.addToast
}
