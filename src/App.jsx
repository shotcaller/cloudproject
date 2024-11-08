import { Typography } from '@mui/material'
import './App.css'
import { Appbar } from './components/Appbar'
import { TicketsPage } from './components/TicketsPage'


function App() {

  return (
    <>
      <Appbar>
        <TicketsPage />
      </Appbar>
    </>
  )
}

export default App
