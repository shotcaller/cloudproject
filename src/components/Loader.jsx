import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

export const Loader = (props) => {
  return (
    <>
        <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1})}
            open={props.open}>
            <CircularProgress color='inherit' />
        </Backdrop>
    </>
  )
}
