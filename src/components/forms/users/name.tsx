import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { FastField, FieldProps } from 'formik'
import fp from '../../../utils/ultra-fast-field-props'

function Name() {
  return (
    <FormControl mt={2} isRequired>
      <FormLabel mb={1}>Nome</FormLabel>
      <FastField name="name">
        {({ field }: FieldProps) => <Input autoFocus maxLength={80} {...fp(field)} />}
      </FastField>
    </FormControl>
  )
}

export default Name
