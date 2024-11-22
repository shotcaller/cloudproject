import { Box, Grid2, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Ticket } from './Ticket'
import { useSelector } from 'react-redux'

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

    const [myTickets, setMyTickets] = useState([])
    const { userName } = useSelector((state) => state.user); 
    const tickets = useSelector((state) => state.tickets);
    useEffect(() => {
        const allTix = [...tickets.open,...tickets.active,...tickets.closed];
        let myTix = [];
        allTix.forEach((element) => {
            if(element.assignedTo=== userName) {
                myTix.push(element)
              }
        })
        setMyTickets(myTix);
    },[tickets]);

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <Paper sx={{ background: '#F0F0F0', padding: 1 }}>
                    <Stack spacing={2}>
                    {
                    myTickets.map((ticket, index) => <Ticket key={index} ticketid={ticket.ticketid} ticketTitle={ticket.ticketTitle} priority={ticket.priority} assignedTo={ticket.assignedTo} {...ticket} />)
                    }
                    </Stack>
                </Paper>
            </Grid2>
        </Grid2>
    )
}
