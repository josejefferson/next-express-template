import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'

export interface IValue {
  title: string | undefined
  setTitle: (title: string) => void
}

export const NavContext = createContext<IValue | null>(null)
export const useNav = () => useContext(NavContext)

export default function NavProvider({ children }: PropsWithChildren) {
  const [title, setTitle] = useState<string>()
  const value = { title, setTitle }
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>
}
