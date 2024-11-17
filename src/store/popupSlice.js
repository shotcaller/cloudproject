import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
    name: 'popup',
    initialState: {
        open: false,
        severity: 'success', //success, info, warning, error
        message: ""
    },
    reducers: {
        openPopup: (state, action) => {
            state.open = true;
            state.severity = action.payload.severity;
            state.message = action.payload.message;
        },
        closePopup: (state) => {
            state.open = false;
            state.message = ""
        } 
    }
})

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;