import {
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  createTheme,
} from '@mui/material'
import Home from './pages/Home'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Home />
    </ThemeProvider>
  )
}

export default App

const globalStyles = {
  html: { fontSize: '62.5%' },
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    tablet: 768,
    md: 900,
    lg: 1200,
    desktop: 1440,
    xl: 1536,
  },
}

const theme = createTheme({
  breakpoints,
  typography: {
    fontFamily: ['Epilogue', 'sans-serif'].join(','),
    h1: {
      fontSize: '3.4rem',
      fontWeight: 700,
      [`@media (min-width:${breakpoints.values.sm}px)`]: {
        fontSize: '4.2rem',
      },
      [`@media (min-width:${breakpoints.values.md}px)`]: {
        fontSize: '5.6rem',
      },
      [`@media (min-width:${breakpoints.values.lg}px)`]: {
        fontSize: '6.4rem',
        lineHeight: 1,
      },
    },
    subtitle1: {
      fontSize: '1.4rem',
    },
    body1: {
      fontSize: '1.6rem',
      [`@media (min-width:${breakpoints.values.sm}px)`]: {
        fontSize: '1.8rem',
      },
    },
    body2: {
      fontSize: '1.2rem',
    },
    button: {
      fontSize: '1.2rem',
      textTransform: 'none',
    },
  },
  palette: {
    neutral: {
      almostWhite: 'hsl(0, 0%, 98%)',
      mediumGray: 'hsl(0, 0%, 41%)',
      almostBlack: 'hsl(0, 0%, 8%)',
    },
  },
})
