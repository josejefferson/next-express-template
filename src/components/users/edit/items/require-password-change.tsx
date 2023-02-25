import { Checkbox } from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

function RequirePasswordChange() {
  return (
    <>
      <Field name="requirePasswordChange" type="checkbox">
        {({ field }: FieldProps) => (
          <Checkbox my={2} isChecked={field.value} {...field}>
            Solicitar alteração de senha
          </Checkbox>
        )}
      </Field>
    </>
  )
}

export default RequirePasswordChange
