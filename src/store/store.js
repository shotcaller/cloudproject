import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import loaderSlice from "./loaderSlice";
import popupSlice from "./popupSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        loader: loaderSlice,
        popup: popupSlice
    }
})