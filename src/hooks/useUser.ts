import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IUser } from '../types/user'
import api from '../utils/api'
import { getLoginURL } from '../utils/helpers'

export default function useUser() {
  const toast = useToast()
  const router = useRouter()
  const [cookie, setCookie, removeCookie] = useCookies(['authorization'])
  const [user, setUser] = useState<IUser>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleLogin = () => {
    router.replace(getLoginURL())
  }

  const handleLogout = () => {
    removeCookie('authorization', { path: '/' })
    toast({
      title: 'Saindo...',
      status: 'loading',
      duration: 100000
    })
    router.reload()
  }

  return { user, loadingUser: loading, login: handleLogin, logout: handleLogout }
}
