import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import loaderSlice from "./loaderSlice";
import popupSlice from "./popupSlice";
import ticketsSlice from "./ticketsSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        loader: loaderSlice,
        popup: popupSlice,
        tickets: ticketsSlice
    }
})
