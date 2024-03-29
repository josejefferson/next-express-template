import { Box, Container, SimpleGrid } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'
import User from '#components/resources/user'
import ResourceList from '#contexts/resource-list'
import { resourceListSort } from '#utils/helpers'

export default function List() {
  return (
    <ResourceList
      id="users"
      name="Usuário"
      writePermissions={['*.users']}
      layout={Layout}
      node={<User />}
      {...resourceListSort()}
    />
  )
}

function Layout({ children }: PropsWithChildren) {
  return (
    <Container maxW="8xl" p={0}>
      <Box mb="70px">
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2} m={3}>
          {children}
        </SimpleGrid>
      </Box>
    </Container>
  )
}
