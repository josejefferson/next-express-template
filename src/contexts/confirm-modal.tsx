import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import { Router } from 'next/router'
import { createContext, PropsWithChildren, ReactNode, useContext, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

type IValue = (params: string | IConfirmDialogParams) => Promise<boolean>

export interface IConfirmDialogParams {
  title: string | ReactNode
  body?: string | ReactNode
  confirmButton?: string | ReactNode
  cancelButton?: string | ReactNode
}

export const ConfirmModalContext = createContext<IValue>(() => {
  throw new Error('This must be inside the ConfirmModalPrivider')
})
export const useConfirmModal = () => useContext(ConfirmModalContext)

const defaultConfirmButton = (
  <>
    <u>S</u>im
  </>
)
const defaultCancelButton = (
  <>
    <u>N</u>ão
  </>
)
export default function ConfirmModalProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState<string | ReactNode>('')
  const [body, setBody] = useState<string | ReactNode>('')
  const [confirmButton, setConfirmButton] = useState<string | ReactNode>(defaultConfirmButton)
  const [cancelButton, setCancelButton] = useState<string | ReactNode>(defaultCancelButton)

  const initialRef = useRef(null)
  const resolveRef = useRef<(value: boolean) => any>(() => {})
  const resolve = resolveRef.current

  const confirmDialog = (params: string | IConfirmDialogParams) => {
    if (typeof params === 'string') params = { title: params }
    resolve(false)
    setTitle(params.title ?? '')
    setBody(params.body ?? '')
    setConfirmButton(params.confirmButton ?? defaultConfirmButton)
    setCancelButton(params.cancelButton ?? defaultCancelButton)
    setOpen(true)

    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve
    })
  }

  const ok = () => {
    resolve(true)
    setOpen(false)
  }

  const cancel = () => {
    resolve(false)
    setOpen(false)
  }

  useHotkeys('s', ok)
  useHotkeys('n', cancel)

  Router.events.on('routeChangeComplete', cancel)

  return (
    <ConfirmModalContext.Provider value={confirmDialog}>
      <Modal isOpen={open} onClose={cancel} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent m={3}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody hidden={!body}>{body}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={ok} ref={initialRef}>
              {confirmButton}
            </Button>
            <Button onClick={cancel}>{cancelButton}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {children}
    </ConfirmModalContext.Provider>
  )
}
