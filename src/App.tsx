import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './Components/AuthProvider'
import PageRoutes from './Components/PageRoutes'
import { GlobalStyles } from './Styles/GlobalStyles'

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'light'
    }
  })
  const theme = useTheme()
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={darkTheme}>
          <PageRoutes />
          <GlobalStyles />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
