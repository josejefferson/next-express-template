import { extendTheme, theme as baseTheme, withDefaultColorScheme } from '@chakra-ui/react'

export const theme = extendTheme(
  {
    colors: {
      primary: baseTheme.colors.green,
      secondary: baseTheme.colors.red
    }
  },
  withDefaultColorScheme({
    colorScheme: 'primary'
  })
)
