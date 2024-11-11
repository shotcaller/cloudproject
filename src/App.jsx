import { createTheme, ThemeProvider, Typography } from '@mui/material'
import './App.css'
import { Appbar } from './components/Appbar'
import { TicketsPage } from './components/TicketsPage'
import { orange } from '@mui/material/colors'


function App() {

  const theme = createTheme({
    palette: {}
  })

  return (
    <>
    <ThemeProvider theme={theme}>
    <Appbar>
        <TicketsPage />
      </Appbar>
    </ThemeProvider>
      
    </>
  )
}

export default App
