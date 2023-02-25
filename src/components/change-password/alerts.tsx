import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'

export default function ChangePasswordAlerts() {
  return (
    <>
      <Alert status="info">
        <AlertIcon />
        <AlertTitle>Aviso:</AlertTitle>
        <AlertDescription>Se você esquecer sua senha, contate um administrador</AlertDescription>
      </Alert>

      <Alert status="warning" mt={1}>
        <AlertIcon />
        <AlertTitle>Atenção:</AlertTitle>
        <AlertDescription>Sua conta não será deslogada dos dispositivos logados</AlertDescription>
      </Alert>
    </>
  )
}
