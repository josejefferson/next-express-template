import {
  Hide,
  IconButton,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tooltip,
  Tr
} from '@chakra-ui/react'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { MdKeyboard } from 'react-icons/md'

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false)
  useHotkeys('f1', () => setOpen(!open), { preventDefault: true })

  return (
    <>
      <Hide below="md">
        <Tooltip label="Atalhos de teclado (F1)">
          <IconButton onClick={() => setOpen(true)} variant="ghost" aria-label="Atalhos de teclado">
            <MdKeyboard size="24px" />
          </IconButton>
        </Tooltip>
      </Hide>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent m={3}>
          <ModalHeader>Atalhos de teclado</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table size="sm" colorScheme="gray">
                <Tbody>
                  <Tr>
                    <Td w={0} p={0}>
                      <Kbd>F1</Kbd>
                    </Td>
                    <Td>Atalhos de teclado</Td>
                  </Tr>
                  <Tr>
                    <Td w={0} p={0}>
                      <Kbd>Esc</Kbd>
                    </Td>
                    <Td>Fechar diálogo</Td>
                  </Tr>
                  <Tr>
                    <Td w={0} p={0}>
                      <Kbd>Enter</Kbd>
                    </Td>
                    <Td>Confirmar / Salvar</Td>
                  </Tr>
                  <Tr>
                    <Td w={0} p={0}>
                      <Kbd>Alt</Kbd>+<Kbd>A</Kbd>
                    </Td>
                    <Td>Adicionar</Td>
                  </Tr>
                  <Tr>
                    <Td w={0} p={0}>
                      <Kbd>Ctrl</Kbd>+<Kbd>S</Kbd>
                    </Td>
                    <Td>Salvar</Td>
                  </Tr>
                  <Tr>
                    <Td w={0} p={0}>
                      <Kbd>Alt</Kbd>+<Kbd>X</Kbd>
                    </Td>
                    <Td>Excluir</Td>
                  </Tr>
                  <Tr>
                    <Td w={0} p={0}>
                      <Kbd>Alt</Kbd>+<Kbd>R</Kbd>
                    </Td>
                    <Td>Atualizar</Td>
                  </Tr>
                  <Tr>
                    <Td w={0} p={0}>
                      <Kbd>S</Kbd>
                    </Td>
                    <Td>Botão &quot;Sim&quot; no diálogo</Td>
                  </Tr>
                  <Tr>
                    <Td w={0} p={0}>
                      <Kbd>N</Kbd>
                    </Td>
                    <Td>Botão &quot;Não&quot; no diálogo</Td>
                  </Tr>
                  <Tr>
                    <Td w={0} p={0}>
                      <Kbd>Alt</Kbd>+<Kbd>←</Kbd>
                    </Td>
                    <Td>Voltar para a página anterior</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
