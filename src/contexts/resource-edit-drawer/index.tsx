import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { MdOpenInNew } from 'react-icons/md'
import { useAPI } from '../api'
import ResourceAdd, { IResourceAddProps } from '../resource-add'
import ResourceEdit, { IResourceEditProps } from '../resource-edit'
import { useResourceList } from '../resource-list'

export interface IValue {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  editingID: string | null
  setEditingID: (id: string | null) => void
}

export const ResourceEditDrawerContext = createContext<IValue>(null as any)
export const useResourceEditDrawer = () => useContext(ResourceEditDrawerContext)

export interface IProps {
  children: ReactNode
  defaultData: any
  resourceEditProps?: Partial<IResourceEditProps>
  resourceAddProps?: Partial<IResourceAddProps>
  resourceEditForm: ReactNode
  resourceAddForm?: ReactNode
}

export default function ResourceEditDrawer({
  children,
  defaultData,
  resourceEditProps,
  resourceAddProps,
  resourceEditForm,
  resourceAddForm
}: IProps) {
  const resourceList = useResourceList()
  const api = useAPI()
  if (!resourceList) throw new Error('Resource edit drawer must be used within a resource list')
  const { id, name, nameFem, namePlural, url } = resourceList
  const props = { id, name, nameFem, namePlural, url }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingID, setEditingID] = useState<string | null>(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ isOpen, onOpen, onClose, editingID, setEditingID }), [])

  return (
    <ResourceEditDrawerContext.Provider value={value}>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <Link href={`/${resourceList.id}/` + (editingID ? `edit?id=${editingID}` : 'add')}>
            <IconButton
              variant="ghost"
              colorScheme="whiteAlpha"
              width="2rem"
              height="2rem"
              position="absolute"
              top="0.5rem"
              right="3rem"
              minW="auto"
              aria-label="Abrir em nova guia"
              color="inherit"
            >
              <MdOpenInNew size={20} />
            </IconButton>
          </Link>
          <DrawerCloseButton />
          <DrawerHeader>
            {editingID ? 'Editar' : 'Adicionar'} {resourceList.name.toLowerCase()}
          </DrawerHeader>
          <DrawerBody p={2}>
            {editingID ? (
              <ResourceEdit
                {...props}
                {...resourceEditProps}
                elementID={editingID}
                hideNavbar
                onSave={() => api.refresh()}
                onRemove={(data) => {
                  onClose()
                  api?.setData([...api.data.filter((i: any) => i._id !== data._id)])
                }}
              >
                {resourceEditForm}
              </ResourceEdit>
            ) : (
              <ResourceAdd
                {...props}
                {...resourceAddProps}
                defaultData={defaultData}
                hideNavbar
                onSave={(data) => {
                  setEditingID(data._id)
                  api?.refresh()
                }}
              >
                {resourceAddForm || resourceEditForm}
              </ResourceAdd>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {children}
    </ResourceEditDrawerContext.Provider>
  )
}
