import { useState, type ReactNode } from 'react'
import { TokenContext } from './TokenContext'
import { type Token } from '@shared/Token';


export default function TokenProvider({ children }: { children: ReactNode }) {
  const [tok, setTok] = useState<Token>({token: 'a.b.c', exp: Date.now(), iat: Date.now()});
  async function getToken() {
    if (Math.floor(Date.now() / 1000) < tok.exp) {
      if (tok.token !== 'a.b.c') return tok
    }
    // TODO: Figure out why I am not able to use https fro this
    const res = await fetch('/api/refresh')
    const token: Token = await res.json()
    console.table(token)
    setTok(token)
    return token
  }
  return <TokenContext.Provider value={getToken}>{children}</TokenContext.Provider>
}
