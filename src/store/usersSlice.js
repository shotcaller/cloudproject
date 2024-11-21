import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllUsers } from "../data/apiLinks";

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        getUsers: (state, action) => {
            state = fetchAllUsers()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            if(action.payload.length>0)
                state = action.payload;
        })
    }
})

export const { getUsers } = usersSlice.actions;

export default usersSlice.reducer;


export const fetchAllUsers = createAsyncThunk('getAllUsers', async () => {
    try {
        const res = await axios.get(getAllUsers);
        if(res && res.data){
            console.log(res.data);
            return res.data;
        }
    } catch (e) {
        console.error(e);
        return [];
    }
})