import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllUsers } from "../data/apiLinks";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: []
    },
    reducers: {
        getUsers: async (state) => {
            state = fetchAllUsers()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            console.log(action.payload)
            if(action.payload.length>0){
                state.users = [];
                action.payload.forEach(element => {
                    state.users.push(element);
                });
            }
            
        })
    }
})

export const { getUsers } = usersSlice.actions;

export default usersSlice.reducer;


export const fetchAllUsers = createAsyncThunk('getAllUsers', async () => {
    try {
        const res = await axios.get(getAllUsers);
        if(res && res.data){
            return res.data;
        }
    } catch (e) {
        console.error(e);
        return [];
    }
})