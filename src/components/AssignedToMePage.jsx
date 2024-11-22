import { Box, Grid2, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Ticket } from './Ticket'

export const AssignedToMePage = () => {
  return (
    <Box sx={{ m: 2}}>
        <Box sx={{ mb: 2, display: 'flex' }}>
            <Typography variant='h3' component='span'>Assigned To Me</Typography>
        </Box>
        <Box>
            <AssignedToMeList />
        </Box>
    </Box>
  )
}

const AssignedToMeList = () => {

    const ticketList = ["Bug 1", "Bug 2", "Bug 3", "Bug 4", "Bug 5"]

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <Paper sx={{ background: '#F0F0F0', padding: 1 }}>
                    <Stack spacing={2}>
                    {
                    ticketList.map((ticket, index) => <Ticket key={index} ticketid={123456} ticketTitle={ticket} priority="High" assignedTo="Ruturaj" />)
                    }
                    </Stack>
                </Paper>
            </Grid2>
        </Grid2>
    )
}
