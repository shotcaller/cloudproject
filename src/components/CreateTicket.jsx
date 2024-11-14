import { Close } from '@mui/icons-material';
import { AppBar, Autocomplete, Box, Button, Dialog, IconButton, Paper, Slide, TextField, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import { createTicketDialogTitle } from '../data/defaultStrings';
import { useForm } from 'react-hook-form';
import { dummyUsersList, priorityList } from '../data/TicketDetailsLists';
import { useSelector } from 'react-redux';

const Transition = forwardRef((props, ref) => <Slide direction='up' ref={ref} {...props} />)

export const CreateTicket = (props) => {
    //Props will have open close dialog from parent
    const {openDialog, handleCloseDialog} = props;

    const saveAndCreate = () => {
        //after save
        handleCloseDialog();
    }

  return (
    <>
        <Paper sx={{ background: '#F0F0F0'}}>

    <Dialog open={openDialog} fullScreen onClose={handleCloseDialog} TransitionComponent={Transition} >
        <AppBar sx={{ position: 'relative'}} >
            <Toolbar>
                <IconButton edge='start' color='inherit' onClick={handleCloseDialog} >
                    <Close />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component="div">
                    {createTicketDialogTitle}
                </Typography>
                <Button autoFocus color='inherit' onClick={saveAndCreate}>
                    Save
                </Button>
            </Toolbar>
        </AppBar>
        <CreateTicketForm handleCloseDialog={handleCloseDialog} />
        
    </Dialog>
    </Paper>
    </>
  )
}

const CreateTicketForm = (props) => {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const {userId, userName, userRole, isLoggedIn } = useSelector((state) => state.user)

    const onSubmit = (data) => {
        console.log({...data, priority, userId, userName});
        props.handleCloseDialog();
    }

    const handlePriorityChange = (event, newPriority) => {
        setPriority(newPriority)
    }
    
    const [priority, setPriority] = useState('Low');


    return (
        <Box component='form' sx={{ m: 3 }}  onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth sx={{ mb: 3 }} label="Ticket title" { ...register("ticketTitle", { required: true })} error={errors.ticketTitle} helperText={errors.ticketTitle?'Ticket title is required':''} />
            <TextField fullWidth multiline sx={{ mb: 3 }} label="Ticket description" {...register("ticketDescription")} />
            <ToggleButtonGroup sx={{ mb: 3 }} color='primary' exclusive value={priority} onChange={handlePriorityChange}>
                {priorityList.map((option, index) => (
                    <ToggleButton key={index} value={option}>{option}</ToggleButton>
                ))}
            </ToggleButtonGroup>

            <Autocomplete sx={{ mb: 3 }} disablePortal getOptionLabel={(option) => option.name} options={dummyUsersList}
            renderInput={(params) => <TextField  {...params} {...register("assignedTo")} label={"Please select a user"} />}
             />

             <Button variant='contained' type='submit'>Create Ticket</Button>

        </Box>
    )
}
