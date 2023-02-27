import { Box, Tooltip } from '@chakra-ui/react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useField } from 'formik'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

export default function ChangeInfo() {
  const [createdAt] = useField('createdAt')
  const [createdBy] = useField('createdBy')
  const [updatedAt] = useField('updatedAt')
  const [updatedBy] = useField('updatedBy')

  return (
    <>
      {/* Criado */}
      <Box hidden={!createdAt.value}>
        <Box fontSize="xs" opacity={0.5}>
          Criado <span hidden={!createdBy.value?.name}>por {createdBy.value?.name}</span>{' '}
          <Tooltip label={dayjs(createdAt.value).format('hh:mm:ss A - DD/MM/YYYY')}>
            {dayjs(createdAt.value).fromNow()}
          </Tooltip>
        </Box>
      </Box>

      {/* Editado */}
      <Box hidden={!updatedAt.value} opacity={0.5}>
        <Box fontSize="xs">
          Editado <span hidden={!updatedBy.value?.name}>por {updatedBy.value?.name}</span>{' '}
          <Tooltip label={dayjs(updatedAt.value).format('hh:mm:ss A - DD/MM/YYYY')}>
            {dayjs(updatedAt.value).fromNow()}
          </Tooltip>
        </Box>
      </Box>
    </>
  )
}
