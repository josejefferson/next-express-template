import { Box, Container, Flex, IconButton, Stack, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { MdArrowBack } from 'react-icons/md'
import KeyboardShortcuts from '../common/keyboard-shortcuts'
import ColorMode from './color-mode'
import MyDrawer from './drawer'
import Title from './title'
import User from './user'

interface IProps {
  title?: string
  showBackButton?: boolean
  hideMenuButton?: boolean
  hideUser?: boolean
  customButtons?: ReactNode
  hideChangePasswordPopover?: boolean
  containerProps?: typeof Container
  navProps?: typeof Box
}

export default function Nav({
  title,
  showBackButton,
  hideMenuButton,
  hideUser,
  customButtons,
  hideChangePasswordPopover,
  containerProps,
  navProps
}: IProps) {
  return (
    <Box
      as="nav"
      bg={useColorModeValue('gray.100', 'gray.900')}
      pl={1}
      pr={4}
      borderTop="10px solid #8257e5"
      userSelect="none"
      {...navProps}
    >
      <Container maxW="8xl" p={0} {...containerProps}>
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
          <Title title={title} />

          <Flex alignItems="center">
            {/* Botões da direita */}
            <Stack direction="row" spacing={2}>
              {customButtons}

              {/* Atalhos de teclado */}
              <KeyboardShortcuts />

              {/* Tema claro/escuro */}
              <ColorMode />

              {/* Usuário */}
              {!hideUser && <User hideChangePasswordPopover={hideChangePasswordPopover} />}
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
