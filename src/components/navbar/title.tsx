import { Box, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { useNav } from '#contexts/nav'

interface IProps {
  title?: string
}

export default function Title({ title }: IProps) {
  const nav = useNav()

  return (
    <>
      <Head>
        <title>{nav?.title || title || 'Sistema'}</title>
      </Head>
      <Box flex="1" ml={2} overflow="hidden">
        <Heading size="md" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {nav?.title || title || 'Sistema'}
        </Heading>
      </Box>
    </>
  )
}
