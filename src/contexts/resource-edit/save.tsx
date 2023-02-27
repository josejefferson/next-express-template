import { Button, IconButton, Tooltip, useMediaQuery } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { MdSave } from 'react-icons/md'

export default function Save({ deny }: { deny?: boolean }) {
  const { isSubmitting } = useFormikContext()
  const [isMedium] = useMediaQuery('(min-width: 768px)')

  if (!isMedium) {
    return (
      <Tooltip label={deny ? 'Você não tem permissão para editar' : 'Salvar'} placement="left">
        <IconButton
          aria-label="Salvar"
          isLoading={isSubmitting}
          type="submit"
          colorScheme="blue"
          rounded="full"
          position="fixed"
          right="3"
          bottom="3"
          size="lg"
          zIndex="1"
          disabled={isSubmitting ?? deny}
        >
          <MdSave />
        </IconButton>
      </Tooltip>
    )
  } else {
    return (
      <Tooltip label="Você não tem permissão para editar" placement="left" isDisabled={!deny}>
        <Button
          isLoading={isSubmitting}
          type="submit"
          colorScheme="blue"
          mt="2"
          rounded="full"
          leftIcon={<MdSave />}
          position="fixed"
          right="3"
          bottom="3"
          size="lg"
          zIndex="1"
          disabled={isSubmitting ?? deny}
        >
          Salvar
        </Button>
      </Tooltip>
    )
  }
}
