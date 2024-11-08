import { Add } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { TicketsGrid } from './TicketsGrid'

export const TicketsPage = () => {
  return (
    <Box sx={{ margin: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant='h3' component='span'>Tickets</Typography>
        <Button variant='contained' endIcon={<Add />} size='large' sx={{ justifyContent: 'center'}}>Create</Button>
        
    </Box>
    <Box>
        <TicketsGrid />
    </Box>
    </Box>
  )
}
