import { Box } from '@chakra-ui/react'
import API from '../../../contexts/api'
import AddUser from './add-user'
import UserList from './user-list'

export default function Users() {
  return (
    <API url="/auth/users">
      <Box mb="60px">
        <UserList />
        <AddUser />
      </Box>
    </API>
  )
}
