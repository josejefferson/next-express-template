import { Box, Button, Heading, useColorModeValue } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { MdClose } from 'react-icons/md'

interface IProps {
  err: any
  title?: string | ReactNode
  footer?: string | ReactNode
  retry?: () => any
}

export default function Failed({ err, title, footer, retry }: IProps) {
  const color = useColorModeValue('red.500', 'red.300')
  if (!err) return <></>

  return (
    <Box textAlign="center" justifyContent="center" mt={3} color={color}>
      <MdClose size={180} style={{ margin: 'auto' }} />
      <Heading my={2}>{title ?? 'Ocorreu um erro'}</Heading>
      <Box>{err?.response?.data?.message || err.message}</Box>
      <Button onClick={retry} hidden={!retry} mt={4} variant="outline" colorScheme="white">
        Tentar novamente
      </Button>
    </Box>
  )
}
