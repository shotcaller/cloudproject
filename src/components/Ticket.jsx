import { Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogTitle, Divider, Modal, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react'
import { TicketDetails } from './TicketDetails';

export const Ticket = (props) => {
    const [openMore, setOpenMore] = useState(false);
    const handleOpenMore = () => setOpenMore(true);
    const handleCloseMore = () => setOpenMore(false);

    const theme = useTheme();
    
    const priorityColors = {
        'low' : theme.palette.success.main,
        'medium' : theme.palette.warning.light,
        'high' : theme.palette.error.light
    }

    const secondaryColor = `${priorityColors[`${props.priority.toLowerCase()}`]}`;
    
    let {ticketid, ticketTitle, ticketStatus, priority, assignedTo} = props;

  return (
    <>
    <Card>
        <CardContent>
            <Box>
            <Typography variant='caption' component="div"  gutterBottom sx={{ background: secondaryColor }}>#{ticketid}</Typography>
            <Typography variant='h6' gutterBottom>{ticketTitle}</Typography>
            <Divider />
            </Box>
            
            <Typography variant='body' component="div">Priority: {priority}</Typography>
            <Typography variant='body' component="div">Assigned To: {assignedTo}</Typography>

        </CardContent>
        <CardActions>
            <Button size="small" onClick={handleOpenMore}>View More</Button>
        </CardActions>
    </Card>
    <Dialog open={openMore} onClose={handleCloseMore} maxWidth="xl" fullWidth={true}>
        <TicketDetails {...props } closeMore={handleCloseMore} />
    </Dialog>
    </>
  )
}
