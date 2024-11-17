import { createTheme, ThemeProvider, Typography } from '@mui/material'
import './App.css'
import { Appbar } from './components/Appbar'
import { TicketsPage } from './components/TicketsPage'
import { useSelector } from 'react-redux'
import { LoginPage } from './components/LoginPage'
import { useState } from 'react'
import {DashboardPage } from './components/DashboardPage'
import { AssignedToMePage } from './components/AssignedToMePage'
import { Loader } from './components/Loader'
import { PopupMessage } from './components/PopupMessage'


function App() {

  //Used conditional logic to route between pages, can use react router later as time crunch

  const theme = createTheme({
    palette: {}
  })

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.loader.loading);

  // 0 - Dashboard, 1 - All Tickets, 2 - Assigned To Me
  const [menuPage, setMenuPage] = useState(0);


  return (
    <>

    <ThemeProvider theme={theme}>
      <Loader open={isLoading} />
      <Appbar changeMenuPage={setMenuPage}>
      {isLoggedIn?
        ((menuPage === 0 && <DashboardPage />) ||
        (menuPage === 1 && <TicketsPage />) ||
        (menuPage === 2 && <AssignedToMePage />))
        :
      <LoginPage />
      }
    </Appbar>
    <PopupMessage />
    </ThemeProvider>
    </>
  )
}

export default App
