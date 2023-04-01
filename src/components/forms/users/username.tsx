import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import type { FieldProps } from 'formik'
import { FastField } from 'formik'
import fp from '#utils/ultra-fast-field-props'

function Username() {
  return (
    <FormControl mt={2} isRequired>
      <FormLabel mb={1}>Nome de usuário</FormLabel>
      <FastField name="username">
        {({ field }: FieldProps) => (
          <InputGroup>
            <InputLeftAddon children="@" />
            <Input autoComplete="off" {...fp(field)} />
          </InputGroup>
        )}
      </FastField>
    </FormControl>
  )
}

export default Username
