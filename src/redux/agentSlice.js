import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAgentsAPI } from "../services/allAPI";
import {toast} from 'react-toastify'

export const fetchAgents = createAsyncThunk('agent/fetchAgents', async(_,{rejectedWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await fetchAgentsAPI(headers);
        if(response.status === 200){
            return response.data;
        }else{
            rejectedWithValue('Error fetching agents');
        }
    }else{
        return rejectedWithValue('User not logged in');
    }
})

const agentSlice = createSlice({
    name : 'agent',
    initialState:{
        agents: [],
        status: 'idle',
        error: null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAgents.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(fetchAgents.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            state.agents = action.payload;
        })
        .addCase(fetchAgents.rejected, (state, action)=>{
            state.status ='rejected';
            state.error = action.error.message;
            toast.error(action.error.message, {position:"top-center"});
        })
    }
})

export default agentSlice.reducer;