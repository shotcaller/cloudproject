import { PieChart } from '@mui/x-charts/PieChart'
import { BarChart } from '@mui/x-charts/BarChart'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import { Box, Grid2, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const DashboardPage = () => {

  const [userCount, setUserCount] = useState([0,0]) // customer , support
  const [myTixCount, setMyTixCount] = useState(0) // my
  const [allTixCount, setAllTixCount] = useState(0) //all tickets
  const [priorityTix, setPriorityTix] = useState({
    low: [],
    medium: [],
    high: []
  });
  const { userName } = useSelector((state) => state.user); 
  

  const users = useSelector((state) => state.users)
  useEffect(() => {
    let usCount = [0,0]
    users.users.forEach((user) => {
      user.userRole==='Customer'?usCount[0]+=1:usCount[1]+=1;
  })
  setUserCount(usCount);
  }, [users])

  const tickets  = useSelector((state) => state.tickets);
  useEffect(() => {
    const allTickets = [...tickets.open,...tickets.active,...tickets.closed];


    let mytixCount = 0;
    let priorityTickets = {
      low: [],
      medium: [],
      high: []
    }

    allTickets.forEach(element => {
      console.log("ticket", element, userName)
      priorityTickets[`${element.priority.toLowerCase()}`].push(element);

      if(element.assignedTo=== userName) {
        mytixCount+=1;
      }
    
    });
    console.log(priorityTickets)
    setMyTixCount(mytixCount);
    setAllTixCount(allTickets.length)
    setPriorityTix(priorityTickets);
   
  },[tickets])

  
  
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
              series={[{ data: [userCount[0], userCount[1]]}]}
              width={400} height={300} />
              <Typography variant='h6'>Number of users by role</Typography>

          </Grid2>
          <Grid2 size={{ sm: 12, md: 6 }} sx={{ justifyItems: 'center', alignContent: 'center',  background: '#F0F0F0'}}>
          {/* <Gauge /> */}
          <Gauge
            value={myTixCount}
            valueMax={allTixCount}
            width={300}
            height={200}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
                transform: 'translate(0px, 0px)',
              },
            }}
            text={
              ({ value, valueMax }) => `${value} / ${valueMax}`
            }
          />
            <Typography variant='h6'>Total tickets assigned to me</Typography>
          </Grid2>
          <Grid2 size={{ sm: 12, md: 6 }} sx={{ justifyItems: 'center', background: '#F0F0F0'}}>
          <PieChart series={[
              {
                data: [
                  {id: 0, value: priorityTix.low.length, label: 'Low', color: 'green'},
                  {id: 1, value: priorityTix.medium.length, label: 'Medium', color: 'orange'},
                  {id: 2, value: priorityTix.high.length, label: 'High', color: 'red'},
  
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
