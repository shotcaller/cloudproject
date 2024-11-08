import { Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'

export const Ticket = (props) => {
    const {id, title, status, priority, assignedTo} = props;
  return (
    <Card>
        <CardContent>
            <Typography variant='h6' gutterBottom>{title}</Typography>
            <Divider />
            <Typography variant='body'>Priority: {priority}</Typography>
        </CardContent>
        <CardActions>
            <Button size="small">View More</Button>
        </CardActions>
    </Card>
  )
}
