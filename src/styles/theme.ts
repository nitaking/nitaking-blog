import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,

  styles: {
    global: props => ({
      'html, body': {
        fontSize: 'sm',
        color: props.colorMode === 'dark' ? 'white' : 'gray.600',
        lineHeight: 'tall',
        padding: 0,
        margin: 0,
      },
      a: {
        color: props.colorMode === 'dark' ? 'white' : 'gray.600',
        textDecoration: 'none',
      },
    }),
  },
}

const theme = extendTheme({ config })

export default theme
