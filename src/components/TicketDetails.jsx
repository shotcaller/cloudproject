import { ArrowDropDown, Close } from '@mui/icons-material';
import { Autocomplete, Avatar, Box, Button, ButtonGroup, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grow, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, MenuList, Paper, Popper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { ticketDetailDescriptionPlaceholder, updateTicketFailed, updateTicketSuccess } from '../data/defaultStrings';
import { dummyUsersList, priorityList, statusList } from '../data/TicketDetailsLists';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { startLoader, stopLoader } from '../store/loaderSlice';
import axios from 'axios';
import { updateTicket } from '../data/apiLinks';
import { trimTicketId } from '../utils/ticketIdShortener';
import { openPopup } from '../store/popupSlice';
import { fetchTickets } from '../store/ticketsSlice';
import moment from 'moment';

export const TicketDetails = (props) => {
    let {ticketid, ticketTitle, ticketDescription, ticketStatus, priority, assignedTo, comments} = props;

    const theme = useTheme();
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const { userName, userId } = useSelector((state) => state.user);

    const [newPriority, setNewPriority] = useState(priority);
    const [newStatus, setNewStatus] = useState(ticketStatus);
 
    const priorityColors = {
        'low' : theme.palette.success.main,
        'medium' : theme.palette.warning.light,
        'high' : theme.palette.error.light
    }

    const secondaryColor = `${priorityColors[`${props.priority.toLowerCase()}`]}`;

    const onSubmit = async (data) => {
        console.log(data)
        let updatePayload = { ticketid, username: userName, userid: userId, updates: {
            ticketTitle, priority: newPriority, ticketStatus: newStatus, assignedTo: data.assignedTo
        }}
        if(data.ticketComment){
            updatePayload.updates.comments = {
                    username: userName,
                    comment: data.ticketComment
                }
        }
        console.log(updatePayload);
        dispatch(startLoader())
        try{
            const res = await axios.put(updateTicket, updatePayload )
            if(res){
                dispatch(openPopup({
                    severity: 'success',
                    message: updateTicketSuccess
                }))
                props.closeMore();
                dispatch(fetchTickets())

            }

        } catch (e) {
            console.error(e);
            dispatch(openPopup({
                severity: 'error',
                message: updateTicketFailed
            }))
        } finally {
            dispatch(stopLoader())
        }
    }



    

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle sx={{ display: 'flex', justifyContent: "space-between", }}>
                <Typography component="span" sx={{ background: secondaryColor, borderRadius: 1, p: 1}} variant='body2'>#{trimTicketId(ticketid)}</Typography> 
                {ticketTitle}
                <IconButton onClick={props.closeMore}>
                    <Close/>
                </IconButton></DialogTitle>
            <DialogContent dividers sx={{ maxHeight: '400px', overflowY: 'auto'}}>

            <Box flex mb={3}>
                <Box component="span">
                <Typography component='span' mr={1}>Priority: </Typography>
                <PriorityDropdown updatePriority={setNewPriority} currentPriority={priority} />
                </Box>
                
                <Box component="div" mt={3}>
                {/* <Typography>Status: </Typography> */}
                <StatusSelection updateStatus={setNewStatus} currentStatus={ticketStatus} />
                </Box>


              
            </Box>
                
                {/* <Typography component="div">Assigned To: </Typography> */}
                <AssignedToSelection register={register} assignedTo={assignedTo} />



                {/* <Typography component="div">Description: </Typography> */}
                <TextField sx={{ mb: 3 }} {...register("ticketDescription")} fullWidth label={ticketDetailDescriptionPlaceholder} value={ticketDescription}/>


                <Typography component="div">Comments: </Typography>
                <TextField sx={{ mb: 3 }} label="Add comment" {...register("ticketComment")} fullWidth multiline />
                <CommentsList comments={comments} />

            </DialogContent>
            <DialogActions>
                <Button type='submit'variant='contained' color='success'>Save Changes</Button>
            </DialogActions>
    </form>
  )
}

const CommentsList = (props) => {
    const comments = props.comments;
    console.log(comments);

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string?.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }

      function stringAvatar(name) {
        name = name?.toUpperCase();
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name?name[0]:'?'}`,
        };
      }
      
    return (
        <>
        <List dense sx={{ width: '100%'}}>
            {
                comments.map((comm, index) => {
                    return (
                        <ListItem key={index} >
                            <ListItemAvatar>
                                <Avatar {...stringAvatar(comm.username)} />
                            </ListItemAvatar>
                            <ListItemText primary={comm.username} secondary={comm.comment} />
                            <Typography variant='caption'>{moment(comm.timestamp).format('YYYY-MM-DD hh:mm:ss')}</Typography>
                        </ListItem>
                    )
                })
            }
        </List>
        </>
    )
}

const PriorityDropdown = (props) => {

    //Props (currentPriority) might contain chosen priority String - Low, Medium, High

    const [open, setOpen] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState(props.currentPriority??"");
    const anchorRef = useRef(null);
    
    
    const priorityListItems = priorityList;

    
    const handlePriorityToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    }

    const handleMenuItemClick = (event, option) => {
        setSelectedPriority(option);
        props.updatePriority(option);
        setOpen(false);
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
          }
      
          setOpen(false);
    }

    return (
        <>
            <ButtonGroup variant='contained' ref={anchorRef}>
                    <Button>{selectedPriority}</Button>
                    <Button size='small' onClick={handlePriorityToggle}>
                        <ArrowDropDown />
                    </Button>
                </ButtonGroup>

                <Popper open={open} sx={{ zIndex: 5 }} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {
                        ({ TransitionProps, placement }) => (
                            <Grow { ...TransitionProps } style={{ transformOrigin: placement=== 'bottom' ? 'center top': 'center bottom'}}>
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem>
                                            {
                                                priorityListItems.map((option, index) => (
                                                    <MenuItem
                                                        key={option}
                                                        selected={option === props.currentPriority}
                                                        onClick={(event) => handleMenuItemClick(event, option)}>
                                                            {option}
                                                    </MenuItem>
                                                ))
                                            }
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )
                    }
                </Popper>
        </>
    )
}

const AssignedToSelection = (props) => {
    //Getting assignedTo value prop
    const { assignedTo, register } = props;
    const [selectedUser, setSelectedUser] = useState(assignedTo??"");
    
    //Mapping list to just users names and not id, as autocomplete needs same structure of list
    let usersSlice = useSelector((state) => state.users.users); 
    let userList = usersSlice.map((user) => user.username);
    userList = ["None", ...userList];


    return (
        <Autocomplete 
            disablePortal
            getOptionLabel={(option) => option}
            options = {userList}
            value={selectedUser}
            onChange={(e, value) => setSelectedUser(value)}
            renderInput={(params) => <TextField {...register("assignedTo", {value: selectedUser} )}  sx={{ zIndex: 99, mb: 3 }} {...params} label={"Assign To"} />} />
    )
}

const StatusSelection = (props) => {

    const [selectedStatus, setSelectedStatus] = useState(props.currentStatus??"");

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        props.updateStatus(event.target.value);
    }


    return (
        <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={selectedStatus}
             label="Status"
             onChange={handleStatusChange}>
                {statusList.map((status,index)=>
                <MenuItem value={status} key={index}>
                    {status}
                </MenuItem>)}
            </Select>
        </FormControl>
    )
}
