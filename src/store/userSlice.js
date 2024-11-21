import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: '12345',
        userName: 'Test',
        userRole: 'Customer',
        isLoggedIn: false
    },
    reducers: {
        login: (state, action) => {
            console.log(action.payload)
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.userRole = action.payload.userRole;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.userId = '';
            state.userName = '';
            state.userRole = '';
            state.isLoggedIn = false;
        }
    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;