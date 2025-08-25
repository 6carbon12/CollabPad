import { createContext } from 'react'
import { type Token } from '@shared/Token'

type TokenContext = () => Promise<Token>

export const TokenContext = createContext<TokenContext | undefined>(undefined)
