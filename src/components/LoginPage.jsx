import { Box, Button, Divider, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../store/userSlice'
import { userTypes } from '../data/TicketDetailsLists'
import axios from 'axios'
import { startLoader, stopLoader } from '../store/loaderSlice'
import { openPopup } from '../store/popupSlice'
import { userLoginFailed, userLoginSuccess, userRegFailed, userRegSuccess } from '../data/defaultStrings'
import { loginUser, registerUser } from '../data/apiLinks'
import { fetchTickets } from '../store/ticketsSlice'
import { fetchAllUsers, getUsers } from '../store/usersSlice'

export const LoginPage = () => {
  return (
    <>
    <Grid2 container spacing={2}>
        <Grid2 size= {{ sm: 1, md: 2, lg: 3}}>

        </Grid2>
        <Grid2 size = {{ sm: 10 , md: 8, lg: 6}}>
            <LoginRegister />
        </Grid2>
        <Grid2 size= {{ sm: 1, md: 2, lg: 3}}>
            
        </Grid2>
    </Grid2>
    </>
  )
}

const LoginRegister = () => {

    const [pageType, setPageType] = useState('Login'); //change to register to see register page. else login
    const { register, handleSubmit, formState: { errors }} = useForm();
    const dispatch = useDispatch();

    const togglePages = () => {
        pageType==='Login'? setPageType('Register'): setPageType('Login');
    }

    const onSubmitLogin = async (data) => {
        if(pageType==='Login'){
            let { username, password } = data; 
            const loginPayload = { username, password };
            console.log(loginPayload);
            dispatch(startLoader())
            try{   
                const res = await axios.post(loginUser, loginPayload);
                if(res && res.data) {
                    console.log(res)
                    dispatch(login({
                        userId: res.data.userid,
                        userName: res.data.username,
                        userRole: res.data.user_type 
                    }));
                    //Show succcess message
                    dispatch(openPopup({
                        severity: 'success',
                        message: userLoginSuccess
                    }))
                    dispatch(fetchTickets())
                    dispatch(fetchAllUsers())
                }
            } catch (e) {
                console.error(e);
                dispatch(openPopup({
                    severity: 'error',
                    message: userLoginFailed
                }))
            }
            finally { dispatch(stopLoader()); }
            
        }
        else {
            let { newUsername, newPassword, userType } = data;
            const registerPayload = { username: newUsername, password: newPassword, user_type: userType };
            console.log(registerPayload);
            dispatch(startLoader())
            try{
                const res = await axios.post(registerUser, registerPayload);
                if(res){
                    dispatch(openPopup({
                        severity: 'success',
                        message: userRegSuccess
                    }))
                    setPageType('Login');
                }
            } catch(e) {
                console.error(e); 
                dispatch(openPopup({
                    severity: 'error',
                    message: userRegFailed
                }))
            } finally {
                dispatch(stopLoader())
            }
        }
    }
    
    return (
        <>
        <Box mt={3}>
            <Paper elevation={3} sx={{ }} >
                <Box p={2}>
                    <Typography sx={{mb: 2}} variant='h5'>{pageType} to Cloud5</Typography>
                    <Divider />
                </Box>
                <Box component='form' onSubmit={handleSubmit(onSubmitLogin)}>
                {pageType==='Login' && <Box p={2}>
                    <TextField sx={{mb: 3}} helperText={errors.username?.message} label="Username" error={errors.username?.message.length>0} fullWidth {...register("username", { required:"Please enter a username" })}  />
                    <TextField sx={{mb: 3}} helperText={errors.username?.message} label="Password" error={errors.password?.message.length>0} fullWidth {...register("password", {required:"Please enter a password" })} />
                </Box>}
                {pageType==='Register' && <Box p={2}>
                    <TextField sx={{mb: 3}} helperText={errors.newUsername?.message} label="Username" error={errors.newUsername?.message.length>0} fullWidth {...register("newUsername", { required:"Please enter a username" })}  />
                    <TextField sx={{mb: 3}} helperText={errors.newPassword?.message} label="Password" error={errors.newPassword?.message.length>0} fullWidth {...register("newPassword", {required: "Please enter a password" })} />
                    <TextField fullWidth select defaultValue='' {...register("userType", { required: 'Please select a user type' })} error={errors.userType?.message.length>0} label="User Type">
                        {userTypes.map((type, index) => (
                            <MenuItem value={type} key={index}>{type}</MenuItem>
                        ))}
                    </TextField>
                </Box>}
                <Box p={2} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Button type='submit' variant='contained'>{pageType}</Button>
                    <Button onClick={togglePages}>{pageType==='Login'?'Register':'Login'}</Button>
                </Box>
                </Box>          
            </Paper>
        </Box>
        </>
    )
}
