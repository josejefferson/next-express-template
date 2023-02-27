import { Box } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import { useResourceList } from '.'
import { useAPI } from '../api'

export default function StatusBar() {
  const bgColor = useColorModeValue('gray.200', 'gray.700')
  const length: number = useAPI().data.length
  const { name, namePlural } = useResourceList()

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
          {length} {length === 1 ? name.toLowerCase() : namePlural.toLowerCase()}
        </span>
      </Box>
    </>
  )
}
