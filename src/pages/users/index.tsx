import { Box, SimpleGrid } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import User from '../../components/resources/user'
import ResourceList from '../../contexts/resource-list'

export default function List() {
  return (
    <ResourceList
      id="users"
      name="Usuário"
      url="/auth/users"
      layout={Layout}
      node={<User />}
      apiProps={{ axiosThen: ({ data }) => {} }}
    />
  )
}

function Layout({ children }: PropsWithChildren) {
  return (
    <Box mb="70px">
      <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2} m={3}>
        {children}
      </SimpleGrid>
    </Box>
  )
}
