import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react'
import { createContext, Fragment, useContext } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import Nav from '#components/navbar'
import api from '#utils/api'
import Form from '../resource-edit/form'

export interface IValue extends IResourceAddProps {
  nameFem: boolean
  namePlural: string
  url: string
}

export const ResourceAddContext = createContext<IValue>(null as any)
export const useResourceAdd = () => useContext(ResourceAddContext) as IValue

export interface IResourceAddProps {
  children?: ReactNode
  layout?: FC<PropsWithChildren>
  id: string
  name: string
  nameFem?: boolean
  namePlural?: string
  url?: string
  writePermissions?: string[]
  defaultData: any
  onSave?: (data: any) => any
  hideNavbar?: boolean
  formButtonsStart?: ReactNode
  formButtonsEnd?: ReactNode
  navProps?: ComponentProps<typeof Nav>
  beforeSubmit?: (values: any) => false | any
}

export default function ResourceAdd(props: IResourceAddProps) {
  const toast = useToast()
  const router = useRouter()
  const [saveAndAdd] = useLocalStorageState('saveAndAdd', { defaultValue: false })
  const {
    children,
    layout,
    id,
    name,
    nameFem,
    namePlural,
    url,
    defaultData,
    onSave,
    hideNavbar,
    formButtonsStart,
    formButtonsEnd,
    navProps,
    beforeSubmit
  } = props

  const Layout = layout ?? Fragment

  const value: IValue = {
    ...props,
    nameFem: nameFem ?? false,
    namePlural: namePlural ?? name + 's',
    url: url ?? `/${id}`
  }

  // Envia os dados
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    if (beforeSubmit) values = beforeSubmit(values)
    if (!values) return

    return api
      .post(value.url, values)
      .then(({ data }) => {
        toast({
          title: name + ' adicionad' + (nameFem ? 'a' : 'o'),
          status: 'success',
          duration: 5000,
          isClosable: true
        })
        if (onSave) return onSave(data)
        if (saveAndAdd) router.reload()
        else router.replace(`/${id}/edit/?id=${data._id}`)
      })
      .catch((err) => {
        setSubmitting(false)
        toast({
          title: 'Erro ao adicionar ' + name.toLowerCase(),
          description: err?.response?.data?.message || err.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        })
      })
  }

  return (
    <>
      <ResourceAddContext.Provider value={value}>
        {!hideNavbar && (
          <Nav title={'Adicionar ' + name.toLowerCase()} showBackButton {...navProps} />
        )}

        <Layout>
          <Form
            data={defaultData}
            handleSubmit={handleSubmit}
            customButtonsStart={formButtonsStart}
            customButtonsEnd={formButtonsEnd}
          >
            {children}
          </Form>
        </Layout>
      </ResourceAddContext.Provider>
    </>
  )
}
