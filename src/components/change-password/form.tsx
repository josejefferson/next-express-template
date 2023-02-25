import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  theme
} from '@chakra-ui/react'
import { useState } from 'react'
import PasswordStrengthBar from 'react-password-strength-bar'
import PasswordInput from '../common/password-input'
const { colors } = theme

export default function ChangePasswordForm({ handleSubmit, submitting }: any) {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const invalid = password !== confirmPassword
  const disabled = !oldPassword || !password || !confirmPassword || invalid

  return (
    <form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault()
        !disabled && handleSubmit(e)
      }}
    >
      <FormControl mt={3} isRequired isDisabled={submitting}>
        <FormLabel>Senha anterior</FormLabel>
        <PasswordInput
          name="oldPassword"
          placeholder="Senha anterior"
          autoFocus
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </FormControl>

      <FormControl mt={3} isRequired isDisabled={submitting}>
        <FormLabel>Nova senha</FormLabel>
        <PasswordInput
          name="password"
          placeholder="Nova senha"
          size="lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormHelperText>
          <PasswordStrengthBar
            password={password}
            shortScoreWord="Muito curta"
            barColors={[
              colors.gray[500],
              colors.red[500],
              colors.orange[500],
              colors.blue[500],
              colors.green[500]
            ]}
            scoreWords={['Fraca', 'Fraca', 'OK', 'Boa', 'Forte']}
          />
        </FormHelperText>
      </FormControl>

      <FormControl isRequired isDisabled={submitting} isInvalid={invalid}>
        <FormLabel>Confirme a nova senha</FormLabel>
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirme a nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FormErrorMessage hidden={!invalid}>As senhas não se correspondem</FormErrorMessage>
      </FormControl>

      <Center mt={3}>
        <Button
          type="submit"
          colorScheme="green"
          size="lg"
          isLoading={submitting}
          disabled={submitting || disabled}
        >
          Confirmar
        </Button>
      </Center>
    </form>
  )
}
