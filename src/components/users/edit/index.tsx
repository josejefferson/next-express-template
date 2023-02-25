import { Box, Flex } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { KeyboardEvent } from 'react'
import DeleteUser from './components/delete-user'
import Save from './components/save'
import ChangeInfo from './items/change-info'
import Name from './items/name'
import Password from './items/password'
import Permissions from './items/permissions'
import Photo from './items/photo'
import RequirePasswordChange from './items/require-password-change'
import Username from './items/username'

export default function EditUser({ data, handleSubmit }: any) {
  const handleKeyPress = (e: KeyboardEvent<HTMLFormElement>) => {
    if ((e.target as any)?.tagName === 'TEXTAREA') return
    if (e.key === 'Enter') e.preventDefault()
  }

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      <Form
        style={{ width: '100%', padding: '10px', marginBottom: '60px' }}
        onKeyPress={handleKeyPress}
      >
        <Flex gap={3}>
          <Box flex="1">
            <ChangeInfo />
            <Box display="block" mt={2}>
              <DeleteUser />
            </Box>
            <Name />
            <Username />
            <Photo />
            <Password />
            <RequirePasswordChange />
            <Permissions />
            <Save />
          </Box>
        </Flex>
      </Form>
    </Formik>
  )
}
