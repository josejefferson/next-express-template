import {
  ComponentProps,
  createContext,
  FC,
  Fragment,
  PropsWithChildren,
  ReactNode,
  useContext
} from 'react'
import Nav from '../../components/navbar'
import API, { IProps as IAPIProps } from '../api'
import Resources from './resources'

export interface IValue extends IProps {
  namePronoun: string
  namePlural: string
  url: string
}

export const ResourceListContext = createContext<IValue>(null as any)
export const useResourceList = () => useContext(ResourceListContext) as IValue

interface IProps extends Omit<Omit<IAPIProps, 'url'>, 'children'> {
  children?: ReactNode
  layout?: FC<PropsWithChildren>
  id: string
  name: string
  namePronoun?: string
  namePlural?: string
  url?: string
  writePermissions?: string[]
  hideNavbar?: boolean
  hideStatusbar?: boolean
  hideAddButton?: boolean
  node?: ReactNode
  navProps?: ComponentProps<typeof Nav>
  apiProps?: Partial<IAPIProps>
}

export default function ResourceList(props: IProps) {
  let { children, id, name, namePronoun, namePlural, url, hideNavbar, node, navProps, apiProps } =
    props

  const value: IValue = {
    ...props,
    namePronoun: namePronoun ?? 'o',
    namePlural: namePlural ?? name + 's',
    url: url ?? `/${id}`
  }

  return (
    <>
      <ResourceListContext.Provider value={value}>
        {!hideNavbar && <Nav title={value.namePlural} {...navProps} />}

        <API {...apiProps} url={value.url}>
          {children ?? <Resources node={node} />}
        </API>
      </ResourceListContext.Provider>
    </>
  )
}
