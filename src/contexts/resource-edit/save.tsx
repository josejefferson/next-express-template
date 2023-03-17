import { Button, IconButton, Tooltip, useMediaQuery } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { MdSave, MdSaveAs } from 'react-icons/md'
import useLocalStorageState from 'use-local-storage-state'

export default function Save({ deny }: { deny?: 0 | 1 }) {
  const { isSubmitting } = useFormikContext()
  const [isMedium] = useMediaQuery('(min-width: 768px)')
  const [saveAndAdd, setSaveAndAdd] = useLocalStorageState('saveAndAdd', {
    defaultValue: false
  })
  const ref = useRef<HTMLButtonElement>(null)
  useHotkeys(
    'ctrl+s',
    () => {
      const focusEl: any = document.activeElement
      focusEl?.blur?.()
      ref.current?.click()
      focusEl?.focus?.()
    },
    {
      enableOnFormTags: true,
      preventDefault: true
    }
  )

  if (!isMedium) {
    return (
      <Tooltip
        label={
          deny ? 'Você não tem permissão para editar' : saveAndAdd ? 'Salvar e adicionar' : 'Salvar'
        }
        placement="left"
      >
        <IconButton
          ref={ref}
          title="Ctrl+S"
          aria-label={saveAndAdd ? 'Salvar e adicionar' : 'Salvar'}
          onContextMenu={(e) => {
            e.preventDefault()
            setSaveAndAdd(!saveAndAdd)
          }}
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
          {saveAndAdd ? <MdSave /> : <MdSaveAs />}
        </IconButton>
      </Tooltip>
    )
  } else {
    return (
      <Tooltip label="Você não tem permissão para editar" placement="left" isDisabled={!deny}>
        <Button
          ref={ref}
          title="Ctrl+S"
          onContextMenu={(e) => {
            e.preventDefault()
            setSaveAndAdd(!saveAndAdd)
          }}
          isLoading={isSubmitting}
          type="submit"
          colorScheme="blue"
          mt="2"
          rounded="full"
          leftIcon={saveAndAdd ? <MdSave /> : <MdSaveAs />}
          position="fixed"
          right="3"
          bottom="3"
          size="lg"
          zIndex="1"
          disabled={isSubmitting ?? deny}
        >
          {saveAndAdd ? 'Salvar e adicionar' : 'Salvar'}
        </Button>
      </Tooltip>
    )
  }
}
