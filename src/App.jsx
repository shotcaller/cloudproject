import { createTheme, ThemeProvider, Typography } from '@mui/material'
import './App.css'
import { Appbar } from './components/Appbar'
import { TicketsPage } from './components/TicketsPage'
import { Provider } from 'react-redux'
import store from './store/store'


function App() {

  const theme = createTheme({
    palette: {}
  })

  return (
    <>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <Appbar>
        <TicketsPage />
      </Appbar>
    </ThemeProvider>

    </Provider>      
    </>
  )
}

export default App
