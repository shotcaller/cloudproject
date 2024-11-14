import { Add } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { TicketsGrid } from './TicketsGrid'
import { CreateTicket } from './CreateTicket'

export const TicketsPage = () => {

  const [openCreate, setOpenCreate] = useState(false);

  return (
    <Box sx={{ margin: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant='h3' component='span'>Tickets</Typography>
        <Button onClick={() => setOpenCreate(true)} variant='contained' endIcon={<Add />} size='large' sx={{ justifyContent: 'center'}}>Create</Button>
    </Box>
    <Box>
        <TicketsGrid />
    </Box>
    <CreateTicket openDialog={openCreate} handleCloseDialog={() => setOpenCreate(false)} />

    </Box>
  )
}
