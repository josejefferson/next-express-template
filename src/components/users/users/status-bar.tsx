import { Box, useColorModeValue } from '@chakra-ui/react'
import { useAPI } from '../../../contexts/api'
import { IUser } from '../../../types/user'

export default function StatusBar() {
  const users: IUser[] = useAPI().data
  const bgColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <>
      <Box
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
        borderTopWidth="1px"
        bgColor={bgColor}
        display="block"
        alignItems="center"
        px={2}
        py={1}
        userSelect="none"
      >
        <span>
          {users.length} usuário{users.length !== 1 && 's'}
        </span>{' '}
      </Box>
    </>
  )
}
