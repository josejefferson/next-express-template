/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../contexts/auth'

interface IProps {
  children: ReactNode
  disabled?: boolean
}

export default function ChangePasswordPopover({ children, disabled }: IProps) {
  const { user, loading } = useAuth()
  const changePasswordPopover = useDisclosure()
  useEffect(() => {
    if (!disabled && !loading && user && user?.requirePasswordChange) {
      changePasswordPopover.onOpen()
    }
  }, [loading])

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={changePasswordPopover.isOpen}
      onClose={changePasswordPopover.onClose}
      placement="bottom-end"
      closeOnBlur={false}
      autoFocus={false}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton
            onClick={(e) => {
              e.stopPropagation()
              changePasswordPopover.onClose()
            }}
          />
          <PopoverHeader fontWeight="500">Ação necessária</PopoverHeader>
          <PopoverBody>
            É necessário efetuar a troca de senha da sua conta, clique no botão abaixo:
            <Link href="/change-password">
              <Button mt={2} colorScheme="red">
                Trocar senha
              </Button>
            </Link>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
