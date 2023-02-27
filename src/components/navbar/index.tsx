/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  SkeletonCircle,
  Stack,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
import { MdArrowBack, MdDarkMode, MdLightMode } from 'react-icons/md'
import { useAuth } from '../../contexts/auth'
import { getAvatarColor } from '../../utils/helpers'
import MyDrawer from './drawer'

interface IProps {
  title?: string
  showBackButton?: boolean
  hideMenuButton?: boolean
  hideUser?: boolean
  customButtons?: ReactNode
  hideChangePasswordPopover?: boolean
}

export default function Nav({
  title,
  showBackButton,
  hideMenuButton,
  hideUser,
  customButtons,
  hideChangePasswordPopover
}: IProps) {
  const { user, loading, login, logout } = useAuth()
  const { colorMode, toggleColorMode } = useColorMode()
  const changePasswordPopover = useDisclosure()
  useEffect(() => {
    if (!hideChangePasswordPopover && !loading && user && user?.requirePasswordChange) {
      changePasswordPopover.onOpen()
    }
  }, [loading])

  return (
    <>
      <Head>
        <title>{title || 'Sistema'}</title>
      </Head>

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
          <IconButton
            variant="ghost"
            hidden={!showBackButton}
            aria-label="Voltar"
            mx="2"
            onClick={() => {
              if (window.opener) window.close()
              else window.history.back()
            }}
          >
            <MdArrowBack />
          </IconButton>

          {!showBackButton && !hideMenuButton && <MyDrawer />}

          {/* Título */}
          <Box flex="1" ml={2} overflow="hidden">
            <Heading size="md" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
              {title || 'Sistema'}
            </Heading>
          </Box>

          <Flex alignItems="center">
            {/* Botões da direita */}
            <Stack direction="row" spacing={2}>
              {customButtons}

              {/* Tema claro/escuro */}
              <Tooltip label="Ativar/desativar tema escuro" placement="bottom-start">
                <IconButton
                  onClick={toggleColorMode}
                  variant="ghost"
                  aria-label="Ativar/desativar tema escuro"
                >
                  {colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
                </IconButton>
              </Tooltip>

              {/* Usuário */}
              {!hideUser && (
                <Menu>
                  <MenuButton rounded="full" cursor="pointer" minW={0} ml={1} textDecoration="none">
                    <>
                      <SkeletonCircle size="8" hidden={!loading} />
                      <Popover
                        returnFocusOnClose={false}
                        isOpen={changePasswordPopover.isOpen}
                        onClose={changePasswordPopover.onClose}
                        placement="bottom-end"
                        closeOnBlur={false}
                        autoFocus={false}
                      >
                        <PopoverTrigger>
                          <Avatar
                            bg={getAvatarColor(user?.name) + '.500'}
                            size="sm"
                            name={user?.name}
                            src={user?.photo}
                            hidden={loading}
                          />
                        </PopoverTrigger>
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
                              É necessário efetuar a troca de senha da sua conta, clique no botão
                              abaixo:
                              <Link href="/change-password">
                                <Button mt={2} colorScheme="red">
                                  Trocar senha
                                </Button>
                              </Link>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </>
                  </MenuButton>

                  <MenuList alignItems="center">
                    <Center mt={4}>
                      <Avatar
                        bg={getAvatarColor(user?.name) + '.500'}
                        size="2xl"
                        name={user?.name}
                        src={user?.photo}
                      />
                    </Center>

                    <Center my={5}>{user?.name}</Center>

                    <MenuDivider />

                    <Link href="/change-password" hidden={!user}>
                      <MenuItem>Trocar senha</MenuItem>
                    </Link>

                    <MenuItem hidden={!!user} onClick={login}>
                      Fazer login
                    </MenuItem>

                    <MenuItem onClick={logout} hidden={!user}>
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
