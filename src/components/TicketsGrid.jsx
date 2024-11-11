import { Card, Grid2, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Ticket } from './Ticket'

export const TicketsGrid = () => {
  return (
    <>
        <Grid2 container spacing={2}>
            <TicketBlock title={'Open'} />
            <TicketBlock title={'Active'} />
            <TicketBlock title={'Closed'} />
        </Grid2>
    </>
  )
}

const TicketBlock = (props) => {

    const ticketList = ["Bug 1", "Bug 2", "Bug 3", "Bug 4", "Bug 5"]

    return (
        <Grid2 size={4}>
            <Paper sx={{ background: '#F0F0F0', padding: 1}} elevation={2}>
                <Stack spacing={2}>
                <Card sx={{ padding: 1 }}>
                <Typography variant='h5'>{props.title}</Typography>
                </Card>
                {
                    ticketList.map((ticket, index) => <Ticket key={index} id={123456} title={ticket} priority="High" assignedTo="Ruturaj" />)
                }
                
                </Stack>
            </Paper>
        </Grid2>
    )
}
