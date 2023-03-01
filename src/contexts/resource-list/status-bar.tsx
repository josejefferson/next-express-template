import { Box, Container } from '@chakra-ui/layout'
import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { MdRefresh } from 'react-icons/md'
import { useResourceList } from '.'
import { useAPI } from '../api'

export default function StatusBar() {
  const bgColor = useColorModeValue('gray.200', 'gray.700')
  const { data, loading, error, refresh } = useAPI()
  const length: number = data?.length
  const { name, namePlural } = useResourceList()

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      borderTopWidth="1px"
      bgColor={bgColor}
      display="flex"
      alignItems="center"
      px={2}
      py={1}
      userSelect="none"
      hidden={length === undefined}
    >
      <Container maxW="8xl" p={0}>
        <IconButton aria-label="Atualizar" size="xs" variant="ghost" mr={1} onClick={refresh}>
          <MdRefresh />
        </IconButton>
        <span>
          {loading
            ? 'Carregando...'
            : error
            ? 'Erro'
            : length + ' ' + (length === 1 ? name.toLowerCase() : namePlural.toLowerCase())}
        </span>
      </Container>
    </Box>
  )
}
