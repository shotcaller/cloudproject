import { Box, Button, Divider, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../store/userSlice'
import { userTypes } from '../data/TicketDetailsLists'

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

    const onSubmitLogin = (data) => {
        if(pageType==='Login'){
            let { username, password } = data; 
            const loginPayload = { username, password };
            console.log(loginPayload);

            //On success verify
            dispatch(login({
                userId: '12345',
                userName: 'Ruturaj',
                userRole: 'Customer' 
            }));
        }
        else {
            let { newUsername, newPassword, userType } = data;
            const registerPayload = { newUsername, newPassword, userType };
            console.log(registerPayload);
            setPageType('Register');
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
                    <TextField sx={{mb: 3}} helperText={errors.username?"Please enter a username":''} label="Username" error={errors.username} fullWidth {...register("username", { required: true })}  />
                    <TextField sx={{mb: 3}} helperText={errors.username?"Please enter a password":''} label="Password" error={errors.password} fullWidth {...register("password", {required: true })} />
                </Box>}
                {pageType==='Register' && <Box p={2}>
                    <TextField sx={{mb: 3}} helperText={errors.newUsername?"Please enter a username":''} label="Username" error={errors.newUsername} fullWidth {...register("newUsername", { required: true })}  />
                    <TextField sx={{mb: 3}} helperText={errors.newPassword?"Please enter a password":''} label="Password" error={errors.newPassword} fullWidth {...register("newPassword", {required: true })} />
                    <TextField fullWidth select defaultValue='' {...register("userType", { required: 'Please select a user type' })} error={errors.userType?.message} label="User Type">
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
