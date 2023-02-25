import { Button, IconButton, Tooltip, useMediaQuery } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { MdSave } from 'react-icons/md'

export default function Save() {
  const { isSubmitting } = useFormikContext()
  const [isMedium] = useMediaQuery('(min-width: 768px)')

  if (!isMedium) {
    return (
      <Tooltip label="Salvar" placement="left">
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
        >
          <MdSave />
        </IconButton>
      </Tooltip>
    )
  } else {
    return (
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
      >
        Salvar
      </Button>
    )
  }
}
