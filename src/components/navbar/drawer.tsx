import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRef } from 'react'
import { MdClose, MdHome, MdMenu, MdPerson } from 'react-icons/md'
import type { IMenu } from '../../types/menu'

export const MENU: IMenu[] = [
  { name: 'Início', url: '/', icon: MdHome },
  { name: 'Usuários', url: '/users', icon: MdPerson }
]

export default function MyDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<any>()

  return (
    <>
      <IconButton variant="ghost" aria-label="Menu" mx="2" onClick={onOpen} ref={btnRef}>
        <MdMenu />
      </IconButton>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader p={0}>
            <Box
              as="nav"
              bg={useColorModeValue('gray.100', 'gray.900')}
              pl={1}
              pr={4}
              borderTop="10px solid #8257e5"
              userSelect="none"
            >
              <Flex h={16} alignItems="center" justifyContent="space-between">
                {/* Botão de voltar */}
                <IconButton variant="ghost" aria-label="Voltar" mx="2" onClick={onClose}>
                  <MdClose />
                </IconButton>

                {/* Título */}
                <Box flex="1" ml={2} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                  <Heading size="md" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                    Menu
                  </Heading>
                </Box>
              </Flex>
            </Box>
          </DrawerHeader>

          <DrawerBody px={2}>
            {MENU.map(({ name, url, icon: Icon, forceReload }, i: number) =>
              forceReload ? (
                <a href={url} key={i}>
                  <Button
                    variant="ghost"
                    w="100%"
                    overflow="hidden"
                    leftIcon={<Icon />}
                    justifyContent="flex-start"
                    px={3}
                    mb={1}
                    colorScheme="white"
                  >
                    <Box textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" ml={2}>
                      {name}
                    </Box>
                  </Button>
                </a>
              ) : (
                <Link href={url} key={i}>
                  <Button
                    variant="ghost"
                    w="100%"
                    overflow="hidden"
                    leftIcon={<Icon />}
                    justifyContent="flex-start"
                    px={3}
                    mb={1}
                    colorScheme="white"
                  >
                    <Box textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" ml={2}>
                      {name}
                    </Box>
                  </Button>
                </Link>
              )
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
