import { Close } from '@mui/icons-material';
import { AppBar, Autocomplete, Box, Button, Dialog, IconButton, Paper, Slide, TextField, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import { createTicketDialogTitle, createTicketFailed, createTicketSuccess } from '../data/defaultStrings';
import { useForm } from 'react-hook-form';
import { dummyUsersList, priorityList } from '../data/TicketDetailsLists';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import delay from '../utils/delay';
import { Loader } from './Loader';
import { startLoader, stopLoader } from '../store/loaderSlice';
import { openPopup } from '../store/popupSlice';
import { createTicket } from '../data/apiLinks';

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
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const createTicketPayload = {...data, priority, userId, userName};
        console.log(createTicketPayload);
        dispatch(startLoader())
        try{
            const res = await axios.post(createTicket, createTicketPayload )
            if(res){
                props.handleCloseDialog();
                dispatch(openPopup({
                    severity: 'success',
                    message: createTicketSuccess
                }))
            }

        } catch (e) {
            console.error(e);
            dispatch(openPopup({
                severity: 'error',
                message: createTicketFailed
            }))
        } finally {
            dispatch(stopLoader())
        }
        
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

            <Autocomplete disabled={userRole==='Customer'} sx={{ mb: 3 }} disablePortal getOptionLabel={(option) => option.name} options={dummyUsersList}
            renderInput={(params) => <TextField  {...params} {...register("assignedTo")} label={"Please select a user"} />}
             />

            <TextField fullWidth multiline sx={{ mb: 3 }} label="Comments (if any)" {...register("ticketComment")} />
            

             <Button variant='contained' type='submit'>Create Ticket</Button>
        </Box>
    )
}
