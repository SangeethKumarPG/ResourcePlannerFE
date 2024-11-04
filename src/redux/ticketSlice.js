import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { assignAgentAPI, createSupportTicketAPI, fetchSupportTicketsAPI, addCommentToSupportTicketAPI, changeSupportTicketStatusAPI, deleteTicketAPI } from '../services/allAPI';
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

export const assignAgent = createAsyncThunk('tickets/assignAgent', async({agentId, ticketId}, {rejectedWithValue})=>{
    // console.log("Inside assign agent thunk");
    try{
        if(sessionStorage.getItem('userData')){
            const token = JSON.parse(sessionStorage.getItem('userData')).token;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            const response = await assignAgentAPI(headers, ticketId, agentId);
            if(response.status === 200){
                return response.data;
            }else{
                // toast.error("Unable to assign agent");
                return rejectedWithValue("Unable to assign agent");
            }
        }else{
            // console.log("User not logged in");
            return rejectedWithValue('User not logged in');
        }
    }catch(error){
        console.log(error);
        rejectedWithValue(error);
    }
})

export const deleteTicket = createAsyncThunk('tickets/deleteTicket', async(ticketId, {rejectedWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await deleteTicketAPI(ticketId, headers);
        if(response.status === 200){
            return response.data;
        }else{
            return rejectedWithValue("unable to delete ticket");
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
        .addCase(assignAgent.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(assignAgent.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            const {_id} = action.payload;
            const ticketIndex = state.tickets.findIndex((ticket)=>{
                return ticket._id === _id;
            });
            state.tickets[ticketIndex].assignedTo = action.payload.assignedTo;
            toast.success('Agent assigned successfully', {position:"top-center"});
        })
        .addCase(assignAgent.rejected, (state, action)=>{
            state.status = 'rejected';
            state.error = action.error.message;
            // console.log(action.error);
            toast.error("Could not assign agent", {position:"top-center"});
        })
        .addCase(deleteTicket.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(deleteTicket.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            const {_id} = action.payload;
            const ticketIndex = state.tickets.findIndex((ticket)=>{
                return ticket._id === _id;
            });
            state.tickets.splice(ticketIndex, 1);
            toast.success('Ticket deleted successfully', {position:"top-center"});
        })
    }
})

export default ticketSlice.reducer;