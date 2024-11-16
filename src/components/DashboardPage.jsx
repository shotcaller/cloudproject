import { Box, Typography } from '@mui/material'
import React from 'react'

export const DashboardPage = () => {
  return (
    <Box sx={{ m: 2}}>
        <Box sx={{ mb: 2, display: 'flex' }}>
            <Typography variant='h3' component='span'>Dashboard</Typography>
            
        </Box>
    </Box>
  )
}
