import { Box, Button, Card, CardBody, Heading, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface IProps {
  err: any
  title?: string | ReactNode
  footer?: string | ReactNode
  retry?: () => any
}

export default function Failed({ err, title, footer, retry }: IProps) {
  if (!err) return <></>

  return (
    <Box p={3}>
      <Card bgColor="red.500" color="white">
        <CardBody>
          <Heading size="md" mb={2}>
            {title ?? 'Ocorreu um erro'}
          </Heading>
          <Text>{err?.response?.data?.message || err.message}</Text>
          <Text fontWeight={300} fontSize={14} mt={2} hidden={!footer}>
            {footer}
          </Text>
          <Button onClick={retry} hidden={!retry} mt={4} variant="outline" colorScheme="white">
            Tentar novamente
          </Button>
        </CardBody>
      </Card>
    </Box>
  )
}
