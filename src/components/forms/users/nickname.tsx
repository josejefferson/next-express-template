import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import type { FieldProps } from 'formik'
import { FastField } from 'formik'
import fp from '../../../utils/ultra-fast-field-props'

function Nickname() {
  return (
    <FormControl mt={2}>
      <FormLabel mb={1}>Apelido</FormLabel>
      <FastField name="nickname">
        {({ field }: FieldProps) => <Input autoComplete="off" {...fp(field)} />}
      </FastField>
      <FormHelperText>Este será o nome exibido no site</FormHelperText>
    </FormControl>
  )
}

export default Nickname
