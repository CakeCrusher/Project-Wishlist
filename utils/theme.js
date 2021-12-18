import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e75472',
      100: '#e54364',
      200: '#e23054',
      300: '#df1b43',
      400: '#dc0430',
      500: '#c9042c',
      600: '#b40427',
      700: '#a40423',
      800: '#950420',
      900: '#87041d',
    },
    secondary: {
      50: '#f2aabb',
      100: '#e592a2',
      200: '#e28799',
      300: '#df7b8f',
      400: '#dc6e84',
      500: '#d95f78',
      600: '#c5566d',
      700: '#b34e63',
      800: '#a3475a',
      900: '#944152',
    },
  },
  sizes: {
    22: 88,
    42: 168,
    44: 176,
    50: 202,
    52: 214,
    18: 72,
  },
  components: {
    Button: {
      baseStyle: {
        _stack: { m: -1 },
        rounded: 'full',
      },
      variants: {
        outline: {
          borderWidth: '3',
        },
      },
      defaultProps: {
        colorScheme: 'secondary',
      },
    },
    Input: {
      baseStyle: {
        bg: '#FFFFFF',
        flex: 1,
        maxH: 16,
      },
    },
  },
});

export default theme;
