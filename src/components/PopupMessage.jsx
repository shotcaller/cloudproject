import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '../store/popupSlice';

export const PopupMessage = (props) => {
    //props contain message content, severity, open state
    const { open, severity, message } = useSelector((state) => state.popup);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closePopup())
    }
  return (
    <>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert variant='filled' severity={severity} sx={{ width: '100%' }} onClose={handleClose}>
                {message}
            </Alert>
        </Snackbar>
    </>
  )
}
