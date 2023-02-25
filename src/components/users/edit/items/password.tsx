import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { FastField, FieldProps, useFormikContext } from 'formik'
import fp from '../../../../utils/ultra-fast-field-props'

function Password() {
  const { values }: any = useFormikContext()

  return (
    <>
      <FormControl mt={2} isRequired={!values._id}>
        <FormLabel mb={1}>Senha</FormLabel>
        <FastField name="password" type="password">
          {({ field }: FieldProps) => (
            <Input
              placeholder={values._id ? 'Deixe em branco para manter a senha atual' : ''}
              {...fp(field)}
              type="password"
            />
          )}
        </FastField>
      </FormControl>

      <FormControl mt={2} isRequired={!values._id}>
        <FormLabel mb={1}>Confirmar senha</FormLabel>
        <FastField name="confirmPassword" type="password">
          {({ field }: FieldProps) => (
            <Input
              placeholder={values._id ? 'Deixe em branco para manter a senha atual' : ''}
              {...fp(field)}
              type="password"
            />
          )}
        </FastField>
      </FormControl>
    </>
  )
}

export default Password
