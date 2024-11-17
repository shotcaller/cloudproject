import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        loading: false
    },
    reducers: {
        startLoader: (state) => {
            state.loading = true;
        },
        stopLoader: (state) => {
            state.loading = false;
        }
    }
})

export const {startLoader, stopLoader } = loaderSlice.actions;

export default loaderSlice.reducer;