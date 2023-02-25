import { theme, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import api from '../../utils/api'
import ChangePasswordAlerts from './alerts'
import ChangePasswordForm from './form'

export default function ChangePassword() {
  const toast = useToast()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: any) => {
    const oldPassword = e.target.oldPassword.value
    const password = e.target.password.value
    setSubmitting(true)

    api
      .post('/auth/change-password', { oldPassword, password })
      .then(() => {
        toast(success())
        setTimeout(() => router.replace('/'), 1000)
      })
      .catch((err) => {
        toast(error(err))
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <>
      <ChangePasswordAlerts />
      <ChangePasswordForm handleSubmit={handleSubmit} submitting={submitting} />
    </>
  )
}

function success() {
  return {
    title: 'Sua senha foi alterada com sucesso',
    status: 'success' as const,
    duration: 5000,
    isClosable: true
  }
}

function error(err: any) {
  return {
    title: 'Erro ao salvar',
    description: err?.response?.data?.message || err.message,
    status: 'error' as const,
    duration: 5000,
    isClosable: true
  }
}
