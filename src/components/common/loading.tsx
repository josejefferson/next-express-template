import { Box, Spinner } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Box textAlign="center" p={3}>
      <Spinner color="blue.500" size="lg" />
    </Box>
  )
}
