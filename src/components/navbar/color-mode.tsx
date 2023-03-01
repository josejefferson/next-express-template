import { useColorMode, Tooltip, IconButton } from '@chakra-ui/react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export default function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Tooltip label="Ativar/desativar tema escuro" placement="bottom-start">
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Ativar/desativar tema escuro"
      >
        {colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
      </IconButton>
    </Tooltip>
  )
}
