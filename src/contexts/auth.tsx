import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IUser } from '../types/user'
import api from '../utils/api'
import { getLoginURL } from '../utils/helpers'
import { can } from '../utils/permissions'

export interface IValue {
  user: any
  loading: boolean
  error: any
  login: () => any
  logout: () => any
  hasPermission: (permission: string | string[]) => boolean
  refresh: () => any
}

export const AuthContext = createContext<IValue>({
  user: null,
  loading: true,
  error: null,
  login: () => {},
  logout: () => {},
  hasPermission: (permission) => false,
  refresh: () => {}
})

interface IProps {
  children: ReactNode
}

export default function AuthProvider({ children }: IProps) {
  const toast = useToast()
  const router = useRouter()
  const [cookie, setCookie, removeCookie] = useCookies(['authorization'])
  const [user, setUser] = useState<IUser>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(() => {
    api
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data)
        setError(null)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  const login = () => {
    router.replace(getLoginURL())
  }

  const logout = () => {
    removeCookie('authorization', { path: '/' })
    toast({
      title: 'Saindo...',
      status: 'loading',
      duration: 100000
    })
    router.reload()
  }

  const hasPermission = (permission: string | string[]) => {
    if (!user) return false
    if (typeof permission === 'string') permission = [permission]
    return can(user?.permissions as string[], permission)
  }

  useEffect(fetchData, [fetchData])
  const value = { user, loading, error, login, logout, hasPermission, refresh: fetchData }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
