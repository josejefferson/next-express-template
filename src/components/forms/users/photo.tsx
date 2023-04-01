import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import type { FieldProps } from 'formik'
import { FastField } from 'formik'
import fp from '#utils/ultra-fast-field-props'

function Photo() {
  return (
    <FormControl mt={2}>
      <FormLabel mb={1}>URL da foto</FormLabel>
      <FastField name="photo">
        {({ field }: FieldProps) => <Input autoComplete="off" {...fp(field)} />}
      </FastField>
    </FormControl>
  )
}

export default Photo
