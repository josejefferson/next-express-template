import { Box, Card, CardBody, Heading, Text } from '@chakra-ui/react'

export default function Failed({ err }: { err: any }) {
  if (!err) return <></>

  return (
    <Box p={3}>
      <Card bgColor="red.500" color="white">
        <CardBody>
          <Heading size="md" mb={2}>
            Ocorreu um erro
          </Heading>
          <Text>{err?.response?.data?.message || err.message}</Text>
        </CardBody>
      </Card>
    </Box>
  )
}
