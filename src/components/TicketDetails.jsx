import { ArrowDropDown, Close } from '@mui/icons-material';
import { Autocomplete, Box, Button, ButtonGroup, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grow, IconButton, InputLabel, MenuItem, MenuList, Paper, Popper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { ticketDetailDescriptionPlaceholder } from '../data/defaultStrings';
import { dummyUsersList, priorityList, statusList } from '../data/TicketDetailsLists';

export const TicketDetails = (props) => {
    const {id, title, description, status, priority, assignedTo} = props;

    

  return (
    <>
            <DialogTitle sx={{ display: 'flex', justifyContent: "space-between"}}>
                <Typography component="span">#{id}</Typography> 
                {title}
                <IconButton onClick={props.closeMore}>
                    <Close/>
                </IconButton></DialogTitle>
            <DialogContent dividers>

            <Box flex flexDirection="column">
                <Box component="span">
                <Typography>Priority: </Typography>
                <PriorityDropdown currentPriority={priority} />
                </Box>
                
                <Box component="span">
                <Typography>Status: </Typography>
                <StatusSelection currentStatus={status} />
                </Box>


              
            </Box>
                
                <Typography component="div">Assigned To: </Typography>
                <AssignedToSelection assignedTo={assignedTo} />



                <Typography component="div">Description: </Typography>
                <TextField fullWidth label={ticketDetailDescriptionPlaceholder} value={description}/>


            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='success' onClick={props.closeMore}>Save Changes</Button>
            </DialogActions>
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
    const [selectedUser, setSelectedUser] = useState(props.assignedTo??"");

    const users = dummyUsersList;

    return (
        <Autocomplete
            disablePortal
            getOptionLabel={(option) => option.name}
            options = {users}
            renderInput={(params) => <TextField sx={{ zIndex: 99 }} {...params} value={selectedUser} label={"Please select a user"} />} />
    )
}

const StatusSelection = (props) => {

    const [selectedStatus, setSelectedStatus] = useState(props.status??"");

    const statusListItems = statusList;

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
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
