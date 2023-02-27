import { Box, Heading } from '@chakra-ui/layout'
import { VscEmptyWindow } from 'react-icons/vsc'
import { useResourceList } from '.'

export default function Empty() {
  const { name } = useResourceList()

  return (
    <Box textAlign="center" opacity={0.5} justifyContent="center" mt={3}>
      <VscEmptyWindow size={180} style={{ margin: 'auto' }} />
      <Heading my={2}>Nenhum {name.toLowerCase()}</Heading>
      <Box>
        Crie um {name.toLowerCase()} clicando no botão &quot;Adicionar&quot; no canto inferior
        direito
      </Box>
    </Box>
  )
}
