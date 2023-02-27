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
import Link from 'next/link'
import { MdDelete, MdOpenInNew } from 'react-icons/md'
import { useResource } from '../../contexts/resource'
import { getAvatarColor } from '../../utils/helpers'

export default function User() {
  const { element, handleRemove, openInNewWindow } = useResource()
  const bgColor = useColorModeValue('gray.200', 'gray.600')
  const bgColorActive = useColorModeValue('gray.300', 'gray.500')

  return (
    <Link href={`/users/edit?id=${element._id}`} style={{ height: '100%' }}>
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
            bg={getAvatarColor(element.name) + '.500'}
            size="md"
            name={element.name}
            src={element.photo}
          />
        </Box>

        <Box flex="1" overflow="hidden" h="100%">
          <Box h="calc(100% - 24px)">
            <Box fontWeight="bold" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
              {element.name}
            </Box>

            <Box
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight="300"
              fontSize="xs"
            >
              @{element.username}
            </Box>

            <Box
              fontStyle="italic"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight="200"
            >
              Permissões: {(element.permissions as string[])?.length || 0}
            </Box>

            <Box hidden={!(element.permissions as string[])?.some((p) => p.trim() === '*')}>
              <Badge>ADMINISTRADOR</Badge>
            </Box>
          </Box>
        </Box>

        <Flex flexDirection="column">
          <Tooltip label="Excluir">
            <IconButton colorScheme="red" size="xs" aria-label="Excluir" variant="ghost" mb={1}>
              <MdDelete size="20" onClick={handleRemove} />
            </IconButton>
          </Tooltip>

          <Tooltip label="Abrir em uma janela">
            <IconButton
              colorScheme="blue"
              size="xs"
              aria-label="Abrir em uma janela"
              variant="ghost"
            >
              <MdOpenInNew size="20" onClick={openInNewWindow} />
            </IconButton>
          </Tooltip>
        </Flex>
      </Card>
    </Link>
  )
}
