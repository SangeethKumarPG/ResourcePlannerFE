import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSupportTicketAPI, fetchSupportTicketsAPI, addCommentToSupportTicketAPI, changeSupportTicketStatusAPI } from '../services/allAPI';
import { toast } from 'react-toastify';

export const addTicket = createAsyncThunk('tickets/addTicket', async(ticketData, {rejectedWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        // console.log("Header : ", headers)
        const response = await createSupportTicketAPI(headers, ticketData);
        if(response.status === 201){
            
            return response.data;
        }else{
            return rejectedWithValue(response.data.message);
        }
    }else{
        return rejectedWithValue('User not logged in');
    }
})

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async(_, {rejectedWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await fetchSupportTicketsAPI(headers);
        if(response.status === 200){
            return response.data;
        }else{
            return rejectedWithValue(response.data.message);
        }
    }else{
        return rejectedWithValue('User not logged in');
    }
})

export const addComment = createAsyncThunk('tickets/addComment', async(commentData, {rejectedWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const {ticketId} = commentData;
        console.log("Comment Data : ", commentData);
        delete commentData.ticketId;
        console.log("Comment Data after delete: ", commentData);
        const response = await addCommentToSupportTicketAPI(headers, commentData, ticketId);
        if(response.status === 201){
            return response.data;
        }else{
            rejectedWithValue(response.data.message);
        }
    }else{
        return rejectedWithValue('User not logged in');
    }
});

export const changeTicketStatus = createAsyncThunk('tickets/changeTicketStatus', async(ticketData, {rejectedWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const {ticketId} = ticketData;
        delete ticketData.ticketId;
        const response = await changeSupportTicketStatusAPI(headers, ticketId, ticketData);
        if(response.status === 200){
            return response.data;
        }else{
            return rejectedWithValue(response.data.message);
        }
    }else{
        return rejectedWithValue('User not logged in');
    }
})

const ticketSlice = createSlice({
    name: 'tickets',
    initialState: {
        tickets : [],
        status : 'idle',
        error: null
    },
    reducers:{

    },
    extraReducers: (builder)=>{
        builder.addCase(addTicket.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(addTicket.fulfilled, (state, action)=>{
            state.status ='fulfilled'
            state.tickets.push(action.payload)
            toast.success('Ticket created successfully', {position:"top-center"});
        })
        .addCase(addTicket.rejected, (state, action)=>{
            state.status = 'rejected'
            state.error = action.error.message
            toast.error(action.error.message, {position:"top-center"});
        })
        .addCase(fetchTickets.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchTickets.fulfilled, (state, action)=>{
            state.status = 'fulfilled'
            state.tickets = action.payload
        })
        .addCase(fetchTickets.rejected, (state, action)=>{
            state.status = 'rejected'
            state.error = action.error.message
            toast.error(action.error.message, {position:"top-center"});
        })
        .addCase(addComment.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(addComment.fulfilled, (state, action)=>{
            state.status = 'fulfilled'
            const {_id} = action.payload;
            const ticketIndex = state.tickets.findIndex((ticket)=>{
                return ticket._id === _id;
            })
            state.tickets[ticketIndex].comments.push(action.payload)
            toast.success('Comment added successfully', {position:"top-center"});
        })
        .addCase(addComment.rejected, (state, action)=>{
            state.status = 'rejected'
            state.error = action.error.message
            toast.error(action.error.message, {position:"top-center"});
        })
        .addCase(changeTicketStatus.pending, (state)=>{
            state.status = "loading"
        })
        .addCase(changeTicketStatus.fulfilled, (state, action)=>{
            state.status = "fulfilled"
            const {_id} = action.payload;
            const ticketIndex = state.tickets.findIndex((ticket)=>{
                return ticket._id === _id;
            })
            state.tickets[ticketIndex].status = action.payload.status
            toast.success('Ticket status changed successfully', {position:"top-center"});
        })
        .addCase(changeTicketStatus.rejected, (state, action)=>{
            state.status = "rejected"
            state.error = action.error.message
            toast.error(action.error.message, {position:"top-center"});
        })
    }
})

export default ticketSlice.reducer;