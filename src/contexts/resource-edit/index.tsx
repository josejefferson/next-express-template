import { useToast } from '@chakra-ui/react'
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react'
import { createContext, Fragment, useContext } from 'react'
import Nav from '#components/navbar'
import api from '#utils/api'
import type { IProps as IAPIProps } from '../api'
import API from '../api'
import Form from '../resource-edit/form'

export interface IValue extends IResourceEditProps {
  nameFem: boolean
  namePlural: string
  url: string
}

export const ResourceEditContext = createContext<IValue>(null as any)
export const useResourceEdit = () => useContext(ResourceEditContext) as IValue

export interface IResourceEditProps {
  children?: ReactNode
  layout?: FC<PropsWithChildren>
  id: string
  elementID: string
  name: string
  namePlural?: string
  nameFem?: boolean
  nameProp?: string
  url?: string
  writePermissions?: string[]
  hideNavbar?: boolean
  onSave?: (data: any) => any
  onRemove?: (data: any) => any
  formButtonsStart?: ReactNode
  formButtonsEnd?: ReactNode
  navProps?: ComponentProps<typeof Nav>
  apiProps?: Partial<IAPIProps>
  beforeSubmit?: (values: any) => false | any
}

export default function ResourceEdit(props: IResourceEditProps) {
  const toast = useToast()
  const {
    children,
    layout,
    id,
    elementID,
    name,
    namePlural,
    nameFem,
    url,
    hideNavbar,
    onSave,
    formButtonsStart,
    formButtonsEnd,
    navProps,
    apiProps,
    beforeSubmit
  } = props

  const Layout = layout ?? Fragment

  const value: IValue = {
    ...props,
    nameFem: nameFem ?? false,
    namePlural: namePlural ?? name + 's',
    url: url || `/${id}`
  }

  // Envia os dados
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const { createdAt, createdBy, updatedAt, updatedBy, ...otherValues } = values
    values = otherValues
    if (beforeSubmit) values = beforeSubmit(values)
    if (!values) return

    return api
      .put(`${value.url}/${elementID}`, values)
      .then(({ data }) => {
        if (data === null) {
          throw new Error(
            `${value.nameFem ? 'A' : 'O'} ${name.toLowerCase()} não existe ou foi excluíd${
              value.nameFem ? 'a' : 'o'
            }`
          )
        }

        toast({
          title: name + ' salv' + (value.nameFem ? 'a' : 'o'),
          status: 'success',
          duration: 5000,
          isClosable: true
        })

        if (onSave) return onSave(data)
      })
      .catch((err) => {
        setSubmitting(false)
        toast({
          title: 'Erro ao salvar ' + name.toLowerCase(),
          description: err?.response?.data?.message || err.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        })
      })
  }

  return (
    <>
      <ResourceEditContext.Provider value={value}>
        {!hideNavbar && <Nav title={'Editar ' + name.toLowerCase()} showBackButton {...navProps} />}

        <Layout>
          <API {...apiProps} url={`${value.url}/${elementID}`} disable={!elementID}>
            <Form
              handleSubmit={handleSubmit}
              customButtonsStart={formButtonsStart}
              customButtonsEnd={formButtonsEnd}
            >
              {children}
            </Form>
          </API>
        </Layout>
      </ResourceEditContext.Provider>
    </>
  )
}
