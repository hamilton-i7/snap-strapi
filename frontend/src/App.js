import Home from './pages/Home'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const App = () => {
  return (
    <ThemeProvider
      theme={{
        fonts: {
          body: {
            fontFamily: 'Epilogue, sans-serif',
          },
        },
        colors: {
          almostWhite: 'hsl(0, 0%, 98%)',
          mediumGray: 'hsl(0, 0%, 41%)',
          almostBlack: 'hsl(0, 0%, 8%)',
        },
      }}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  )
}

const Theme = ({ children }) => (
  <ThemeProvider
    theme={{
      fonts: {
        body: {
          fontFamily: 'Epilogue, sans-serif',
        },
      },
      colors: {
        almostWhite: 'hsl(0, 0%, 98%)',
        mediumGray: 'hsl(0, 0%, 41%)',
        almostBlack: 'hsl(0, 0%, 8%)',
      },
    }}>
    {children}
  </ThemeProvider>
)

export default App

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.body.fontFamily};
    font-size: 1.6rem;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  figure {
    margin: 0;
  }

  img {
    display: block;
    height: auto;
    max-width: 100%;    
  }
`
