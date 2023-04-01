import type { ButtonProps } from '@chakra-ui/react'
import type Link from 'next/link'
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react'
import { createContext, useContext } from 'react'
import Nav from '#components/navbar'
import type { IProps as IAPIProps } from '../api'
import API from '../api'
import { useAuth } from '../auth'
import Add from './add'
import Resources from './resources'
import StatusBar from './status-bar'

export interface IValue extends IProps {
  nameFem: boolean
  namePlural: string
  url: string
}

export const ResourceListContext = createContext<IValue>(null as any)
export const useResourceList = () => useContext(ResourceListContext) as IValue

interface IProps {
  children?: ReactNode
  outLayout?: FC<PropsWithChildren>
  layout?: FC<PropsWithChildren>
  id: string
  name: string
  nameFem?: boolean
  namePlural?: string
  url?: string
  removeURL?: string
  writePermissions?: string[]
  hideNavbar?: boolean
  hideStatusbar?: boolean
  hideAddButton?: boolean
  node?: ReactNode
  useGridAndListLayout?: boolean
  listLayout?: FC<PropsWithChildren>
  listNode?: ReactNode
  navProps?: ComponentProps<typeof Nav>
  apiProps?: Partial<IAPIProps>
  addButtonProps?: ButtonProps
  addButtonLinkProps?: ComponentProps<typeof Link>
}

export default function ResourceList(props: IProps) {
  const {
    children,
    outLayout,
    id,
    name,
    nameFem,
    namePlural,
    url,
    hideNavbar,
    node,
    listNode,
    navProps,
    apiProps
  } = props

  const value: IValue = {
    ...props,
    nameFem: nameFem ?? false,
    namePlural: namePlural ?? name + 's',
    url: url ?? `/${id}`
  }

  return (
    <>
      <ResourceListContext.Provider value={value}>
        {!hideNavbar && <Nav title={value.namePlural} {...navProps} />}

        <API {...apiProps} url={value.url} after={<Bottom />} layout={outLayout}>
          {children ?? <Resources node={node} listNode={listNode} />}
        </API>
      </ResourceListContext.Provider>
    </>
  )
}

function Bottom() {
  const auth = useAuth()
  const { hideStatusbar, hideAddButton, writePermissions, addButtonProps } = useResourceList()
  return (
    <>
      {!hideStatusbar && <StatusBar />}
      {!hideAddButton && (
        <Add
          deny={writePermissions && auth?.user && !auth?.hasPermission(writePermissions) ? 1 : 0}
          {...addButtonProps}
        />
      )}
    </>
  )
}
