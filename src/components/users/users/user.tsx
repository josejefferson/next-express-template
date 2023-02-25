import {
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  IconButton,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'
import { MdOpenInNew } from 'react-icons/md'
import Link from 'next/link'
import { IUser } from '../../../types/user'
import { getAvatarColor } from '../../../utils/helpers'

export default function User({
  user,
  handleUserDelete,
  handleUserOpen
}: {
  user: IUser
  handleUserDelete: (e: any, user: IUser) => void
  handleUserOpen: (e: any, user: IUser) => void
}) {
  const bgColor = useColorModeValue('gray.200', 'gray.600')
  const bgColorActive = useColorModeValue('gray.300', 'gray.500')

  return (
    <Link href={`/users/edit?id=${user._id}`} style={{ height: '100%' }}>
      <Card
        flexDirection="row"
        p={2}
        h="100%"
        variant="filled"
        transition=".2s ease"
        _hover={{ opacity: 1, bgColor }}
        _active={{ bgColor: bgColorActive }}
      >
        <Box mr={2}>
          <Avatar
            bg={getAvatarColor(user.name) + '.500'}
            size="md"
            name={user.name}
            src={user.photo}
          />
        </Box>

        <Box flex="1" overflow="hidden" h="100%">
          <Box h="calc(100% - 24px)">
            <Box fontWeight="bold" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
              {user.name}
            </Box>

            <Box
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight="300"
              fontSize="xs"
            >
              @{user.username}
            </Box>

            <Box
              fontStyle="italic"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight="200"
            >
              Permissões: {(user.permissions as string[])?.length || 0}
            </Box>

            <Box hidden={!(user.permissions as string[])?.some((p) => p.trim() === '*')}>
              <Badge>ADMINISTRADOR</Badge>
            </Box>
          </Box>
        </Box>

        <Flex flexDirection="column">
          <Tooltip label="Excluir">
            <IconButton colorScheme="red" size="xs" aria-label="Excluir" variant="ghost" mb={1}>
              <MdDelete size="20" onClick={(e) => handleUserDelete(e, user)} />
            </IconButton>
          </Tooltip>

          <Tooltip label="Abrir em uma janela">
            <IconButton
              colorScheme="blue"
              size="xs"
              aria-label="Abrir em uma janela"
              variant="ghost"
            >
              <MdOpenInNew size="20" onClick={(e) => handleUserOpen(e, user)} />
            </IconButton>
          </Tooltip>
        </Flex>
      </Card>
    </Link>
  )
}
