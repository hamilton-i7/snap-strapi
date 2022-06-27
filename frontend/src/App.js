import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from '@mui/material'
import Home from './pages/Home'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { fontSize: '62.5%' } }} />
      <Home />
    </ThemeProvider>
  )
}

export default App

const theme = createTheme({
  typography: {
    fontFamily: ['Epilogue', 'sans-serif'].join(','),
    h1: {
      fontSize: '3.4rem',
    },
    subtitle1: {
      fontSize: '1.4rem',
    },
    body1: {
      fontSize: '1.6rem',
    },
    button: {
      fontSize: '1.2rem',
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
