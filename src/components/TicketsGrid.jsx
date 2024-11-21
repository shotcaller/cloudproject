import { Card, Grid2, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Ticket } from './Ticket'
import { useSelector } from 'react-redux'

export const TicketsGrid = () => {

    const allTickets = useSelector((state) => state.tickets);

    return (
    <>
        <Grid2 container spacing={2}>
            <TicketBlock title={'Open'} tickets={allTickets.open} />
            <TicketBlock title={'Active'} tickets={allTickets.active} />
            <TicketBlock title={'Closed'} tickets={allTickets.closed} />
        </Grid2>
    </>
  )
}

const TicketBlock = (props) => {

    const ticketList = props.tickets;

    return (
        <Grid2 size={4}>
            <Paper sx={{ background: '#F0F0F0', padding: 1}} elevation={2}>
                <Stack spacing={2}>
                <Card sx={{ padding: 1 }}>
                <Typography variant='h5'>{props.title}</Typography>
                </Card>
                {
                    ticketList.map((ticket, index) => <Ticket key={index} {...ticket} />)
                }
                
                </Stack>
            </Paper>
        </Grid2>
    )
}
