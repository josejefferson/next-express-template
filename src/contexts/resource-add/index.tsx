import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ComponentProps, createContext, ReactNode, useContext } from 'react'
import Nav from '../../components/navbar'
import api from '../../utils/api'
import Form from '../resource-edit/form'

export interface IValue extends IProps {
  namePronoun: string
  namePlural: string
  url: string
}

export const ResourceAddContext = createContext<IValue>(null as any)
export const useResourceAdd = () => useContext(ResourceAddContext) as IValue

interface IProps {
  children?: ReactNode
  id: string
  name: string
  namePronoun?: string
  namePlural?: string
  url?: string
  writePermissions?: string[]
  defaultData: any
  hideNavbar?: boolean
  formButtonsStart?: ReactNode
  formButtonsEnd?: ReactNode
  navProps?: ComponentProps<typeof Nav>
  beforeSubmit?: (values: any) => false | any
}

export default function ResourceAdd(props: IProps) {
  const toast = useToast()
  const router = useRouter()
  let {
    children,
    id,
    name,
    namePronoun,
    namePlural,
    url,
    defaultData,
    hideNavbar,
    formButtonsStart,
    formButtonsEnd,
    navProps,
    beforeSubmit
  } = props

  const value: IValue = {
    ...props,
    namePronoun: namePronoun ?? 'o',
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
          title: name + ' adicionado',
          status: 'success',
          duration: 5000,
          isClosable: true
        })
        router.replace(`/${id}/edit/?id=${data._id}`)
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

        <Form
          data={defaultData}
          handleSubmit={handleSubmit}
          customButtonsStart={formButtonsStart}
          customButtonsEnd={formButtonsEnd}
        >
          {children}
        </Form>
      </ResourceAddContext.Provider>
    </>
  )
}