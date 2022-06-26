import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import Home from './pages/Home'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  )
}

export default App

const theme = createTheme({
  typography: {
    fontFamily: ['Epilogue', 'sans-serif'].join(','),
    htmlFontSize: 10,
  },
  palette: {
    neutral: {
      almostWhite: 'hsl(0, 0%, 98%)',
      mediumGray: 'hsl(0, 0%, 41%)',
      almostBlack: 'hsl(0, 0%, 8%)',
    },
  },
})
