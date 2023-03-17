import { Box, Card, FormControl, FormLabel, IconButton, SimpleGrid } from '@chakra-ui/react'
import type { FieldProps } from 'formik'
import { Field, useFormikContext } from 'formik'
import type { MouseEvent } from 'react'
import { MdAdd } from 'react-icons/md'
import { AutoResizeTextarea } from '../../../utils/auto-size-textarea'
import { permissions } from '../../../utils/permissions'

function Permissions() {
  const { values, setFieldValue } = useFormikContext<any>()
  const addPermission = (e: MouseEvent<HTMLButtonElement, MouseEvent>, permissions: string[]) => {
    if (values.permissions.trim() === '') {
      setFieldValue('permissions', permissions.join('\n'))
    } else {
      setFieldValue(
        'permissions',
        (values.permissions || '') +
          (values.permissions.endsWith('\n') ? '' : '\n') +
          permissions.join('\n')
      )
    }
  }

  return (
    <SimpleGrid columns={[1, 2]} spacing={2}>
      <FormControl mt={2} isRequired>
        <FormLabel mb={1}>Permissões</FormLabel>
        <Field name="permissions">
          {({ field }: FieldProps) => (
            <AutoResizeTextarea {...field} minH="calc(100% -  28px)" isRequired />
          )}
        </Field>
      </FormControl>
      <PermissionList addPermission={addPermission} />
    </SimpleGrid>
  )
}

function PermissionList({ addPermission }: any) {
  return (
    <Box mt={2}>
      <FormLabel mb={1}>Adicione as permissões aqui</FormLabel>
      {permissions.map((permission, i) => (
        <Card key={i} display="flex" alignItems="center" flexDirection="row" p={1} mb={1}>
          <Box>
            <IconButton
              aria-label="Adicionar permissão"
              size="xs"
              mr={2}
              variant="outline"
              onClick={(e) => addPermission(e, permission.ids)}
            >
              <MdAdd />
            </IconButton>
          </Box>
          <Box flex="1">{permission.description}</Box>
        </Card>
      ))}
    </Box>
  )
}

export default Permissions
