import { useToast } from '@chakra-ui/toast'
import { Axios } from 'axios'
import { createContext, ReactNode, useContext } from 'react'
import api from '../utils/api'
import { IValue as IAPIValue } from './api'
import { useConfirmModal } from './confirm-modal'

export interface IValue {
  id: string
  element: any
  baseURL: string
  openInNewWindow: (e: any) => any
  remove: (id: string) => ReturnType<Axios['delete']>
  handleRemove: (e: any) => any
}

interface IProps {
  children: ReactNode
  name: string
  nameFem: boolean
  id: string
  url: string
  removeURL?: string
  element: any
  apiContext?: IAPIValue
}

export const ResourceContext = createContext<IValue>(null as any)
export const useResource = () => useContext(ResourceContext) as IValue

export default function Resource({
  children,
  name,
  nameFem,
  id: resourceID,
  url,
  removeURL,
  element,
  apiContext
}: IProps) {
  const toast = useToast()
  const confirmDialog = useConfirmModal()

  const openInNewWindow = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(`/${resourceID}/edit?id=${element._id}`, '_blank', 'top=0')
  }

  const remove = () => {
    return api.delete(`${removeURL ?? url}/${element._id}`)
  }

  const handleRemove = async (e: any, confirmation = true) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirmation) {
      const confirmed = await confirmDialog({
        title: 'Excluir ' + name.toLowerCase(),
        body: `Tem certeza que deseja excluir ${nameFem ? 'a' : 'o'} ${name.toLowerCase()}?`
      })
      if (!confirmed) return
    }

    const toastId = toast({
      title: `Excluindo ${name.toLowerCase()}...`,
      status: 'loading',
      duration: 100000
    })

    return remove()
      .then(() => {
        toast.update(toastId, {
          title: `${name} excluíd${nameFem ? 'a' : 'o'} com sucesso`,
          status: 'success',
          duration: 5000,
          isClosable: true
        })
        apiContext?.setData([...apiContext.data.filter((i: any) => i._id !== element._id)])
      })
      .catch((err) => {
        toast.update(toastId, {
          title: `Erro ao excluir ${name.toLowerCase()}`,
          description: err?.response?.data?.message || err.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        })
      })
  }

  const value: IValue = {
    id: resourceID,
    element,
    openInNewWindow,
    remove,
    handleRemove,
    baseURL: url
  }

  return <ResourceContext.Provider value={value}>{children}</ResourceContext.Provider>
}
