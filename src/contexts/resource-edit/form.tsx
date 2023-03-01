import { Box } from '@chakra-ui/react'
import { Form as FormikForm, Formik } from 'formik'
import { KeyboardEvent, ReactNode } from 'react'
import { FallbackProps, withErrorBoundary } from 'react-error-boundary'
import { useResourceEdit } from '.'
import Failed from '../../components/common/failed'
import { useAPI } from '../api'
import { useAuth } from '../auth'
import ChangeInfo from './change-info'
import Remove from './remove'
import Save from './save'

interface IProps {
  children: ReactNode
  customButtonsStart?: ReactNode
  customButtonsEnd?: ReactNode
  data?: any
  handleSubmit: any
}

const Form = withErrorBoundary(
  function ({ data, handleSubmit, children, customButtonsStart, customButtonsEnd }: IProps) {
    const res = useResourceEdit()
    const auth = useAuth()
    const api = useAPI()
    if (!data) data = api?.data

    const handleKeyPress = (e: KeyboardEvent<HTMLFormElement>) => {
      if ((e.target as any)?.tagName === 'TEXTAREA') return
      if (e.key === 'Enter') e.preventDefault()
    }

    return (
      <Formik initialValues={data} onSubmit={handleSubmit}>
        <FormikForm
          style={{ width: '100%', padding: '10px', marginBottom: '60px' }}
          onKeyPress={handleKeyPress}
        >
          <ChangeInfo />
          <Box display="block" mt={2}>
            {customButtonsStart}
            <Remove
              deny={res?.writePermissions && auth && !auth?.hasPermission(res?.writePermissions)}
            />
            {customButtonsEnd}
          </Box>
          {children}
          <Save
            deny={res?.writePermissions && auth && !auth?.hasPermission(res?.writePermissions)}
          />
        </FormikForm>
      </Formik>
    )
  },
  { FallbackComponent }
)

export default Form

function FallbackComponent({ error }: FallbackProps) {
  return (
    <Failed
      title="Ocorreu um erro ao renderizar o formulário"
      err={error}
      footer="Contate o administrador se o problema persistir"
    />
  )
}
