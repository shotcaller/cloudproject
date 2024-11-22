import { PieChart } from '@mui/x-charts/PieChart'
import { BarChart } from '@mui/x-charts/BarChart'
import { Box, Grid2, Paper, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export const DashboardPage = () => {

  let priorityTickets = {
    low: [],
    medium: [],
    high: []
  }
  let customerTypes = {
    customer: [],
    customerSupport: []
  }
  const users = useSelector((state) => state.users, (data) => {
    console.log(data.users)
    data.users.forEach((user) => {
      user.userRole==='Customer'?customerTypes.customer.push(user):customerTypes.customerSupport.push(user);
    })
  })
  const tickets = useSelector((state) => state.tickets, (data) => {
    const allTickets = [...data.open,...data.active,...data.closed];
    allTickets.forEach(element => {
      priorityTickets[`${element.priority.toLowerCase()}`].push(element);
    });
  
  });

  
  
  return (
    <Box sx={{ m: 2}}>
        <Box sx={{ mb: 2, display: 'flex' }}>
            <Typography variant='h3' component='div'>Dashboard</Typography>
            
        </Box>
        <Grid2 container spacing={2}>
          <Grid2 size={{ sm: 12, md: 6 }} sx={{ justifyItems: 'center', background: '#F0F0F0'}}>
          <PieChart series={[
              {
                data: [
                  {id: 0, value: tickets.open.length, label: 'Open'},
                  {id: 1, value: tickets.active.length, label: 'Active'},
                  {id: 2, value: tickets.closed.length, label: 'Closed'},
  
                ],
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              }
              
            ]} width={300} height={300} >

            </PieChart>
            <Typography variant='h6'>Ticket count by state</Typography>
          </Grid2>
          <Grid2 size={{ sm: 12, md: 6 }} sx={{ justifyItems: 'center', background: '#F0F0F0'}}>
            <BarChart 
              xAxis={[{ scaleType: 'band', data: ['Customer', 'Customer Support']}]}
              series={[{ data: [customerTypes.customer.length, customerTypes.customerSupport.length]}]}
              width={400} height={300} />
              <Typography variant='h6'>Number of users by role</Typography>

          </Grid2>
          <Grid2 size={{ sm: 12, md: 6 }} sx={{ justifyItems: 'center', background: '#F0F0F0'}}>
            <BarChart 
              xAxis={[{ scaleType: 'band', data: ['Customer', 'Customer Support']}]}
              series={[{ data: [customerTypes.customer.length, customerTypes.customerSupport.length]}]}
              width={400} height={300} />
          </Grid2>
          <Grid2 size={{ sm: 12, md: 6 }} sx={{ justifyItems: 'center', background: '#F0F0F0'}}>
          <PieChart series={[
              {
                data: [
                  {id: 0, value: priorityTickets.low.length, label: 'Low', color: 'green'},
                  {id: 1, value: priorityTickets.medium.length, label: 'Medium', color: 'orange'},
                  {id: 2, value: priorityTickets.high.length, label: 'High', color: 'red'},
  
                ],
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              }
              
            ]} width={300} height={300}  >

            </PieChart>
            <Typography variant='h6'>Ticket count by priority</Typography>

          </Grid2>
        </Grid2>
        <Box>
        
        </Box>
    </Box>
  )
}
