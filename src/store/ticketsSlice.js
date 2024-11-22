import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllTickets } from "../data/apiLinks";

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        open: [],
        active: [],
        closed: []
    },
    reducers: {
        refreshTicketList: async (state) => {
            state = fetchTickets()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTickets.fulfilled, (state, action) => {
            if(action.payload.length>0){
                state.open = [];
                state.active = [];
                state.closed = [];

                action.payload.forEach(ticket => {
                    //ticket.ticketid = ticket.ticketid.length>6?ticket.ticketid.substring(0,6):ticket.ticketid;
                    ticket.assignedTo = ticket.assignedTo?ticket.assignedTo:'None';
                    state[`${ticket.ticketStatus.toLowerCase()}`].push(ticket)
                });
            }
            //state = action.payload.length>0?action.payload:[];
        })
    }
})

export const fetchTickets = createAsyncThunk('getAllTickets', async () => {
    try {
        const res = await axios.get(getAllTickets);
        if(res && res.data && res.data.tickets){
            console.log(res.data.tickets);
            return res.data.tickets;
        }
    } catch (e) {
        console.error(e);
        return [];
    }
})  

export const { refreshTicketList } = ticketsSlice.actions;

export default ticketsSlice.reducer;