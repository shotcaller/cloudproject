import { PieChart } from '@mui/x-charts/PieChart'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export const DashboardPage = () => {

  const tickets = useSelector((state) => state.tickets);
  console.log(tickets);
  return (
    <Box sx={{ m: 2}}>
        <Box sx={{ mb: 2, display: 'flex' }}>
            <Typography variant='h3' component='div'>Dashboard</Typography>
            
        </Box>
        <Box>
        <PieChart series={[
              {
                data: [
                  {id: 0, value: tickets.open.length, label: 'Open'},
                  {id: 1, value: tickets.active.length, label: 'Active'},
                  {id: 2, value: tickets.closed.length, label: 'Closed'},
  
                ]
              }
              
            ]} width={400} height={400}>

            </PieChart>
        </Box>
    </Box>
  )
}
