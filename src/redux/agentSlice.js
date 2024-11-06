import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addAgentAPI, changeAgentPasswordAPI, deleteAgentAPI, fetchAgentsAPI, updateAgentPermissionsAPI } from "../services/allAPI";
import {toast} from 'react-toastify'

export const fetchAgents = createAsyncThunk('agent/fetchAgents', async(_,{rejectWithValue})=>{
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
            return rejectWithValue({message:response?.response?.data});
        }
    }else{
        return rejectWithValue({message:'User not logged in'});
    }
})

export const addAgent = createAsyncThunk('agent/addAgent', async(agentData, {rejectWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await addAgentAPI(headers, agentData);
        if(response.status === 201){
            return response.data;
        }else{
            return rejectWithValue({message:response?.response?.data});
        }
    }else{
        return rejectWithValue({message:'User not logged in'})
    }
})

export const changeAgentPassword = createAsyncThunk('agent/changeAgentPassword', async(agentData, {rejectWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const {agentId} = agentData;
        const response = await changeAgentPasswordAPI(headers, agentData, agentId);
        if(response.status === 200){
            return response.data;
        }else{
            console.log(response?.response?.data)
            return rejectWithValue({message:response?.response?.data});
        }

    }
})

export const updateAgentPermission = createAsyncThunk('agent/updateAgentPermission', async({permissions, agentId}, {rejectWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await updateAgentPermissionsAPI(headers, {permissions:permissions}, agentId);
        if(response.status === 200){
            return response.data;
        }else{
            return rejectWithValue({message:response?.response?.data});
        }
    }else{
        rejectWithValue({message:'User not logged in'})
    }
})

export const deleteAgent = createAsyncThunk('agent/deleteAgent', async(agentId, {rejectWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const response = await deleteAgentAPI(agentId, headers);
        if(response.status === 200){
            return response.data;
        }else{
            return rejectWithValue({message: response?.response?.data})
        }
    }else{
        return rejectWithValue({message:'User not logged in'})
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
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(addAgent.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(addAgent.fulfilled, (state, action)=>{
            state.status = 'fullfilled';
            state.agents.push(action.payload);
            toast.success("Agent added successfully", {position:"top-center"});
        })
        .addCase(addAgent.rejected, (state, action)=>{
            state.status = 'rejected';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(changeAgentPassword.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(changeAgentPassword.fulfilled, (state, action)=>{
            state.status = 'fullfilled';
            toast.success("Password changed successfully", {position:"top-center"});
        })
        .addCase(changeAgentPassword.rejected, (state, action)=>{
            state.status = 'rejected';
            state.error = action.payload?.message;
            // console.log(action.payload);
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(updateAgentPermission.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(updateAgentPermission.fulfilled, (state, action)=>{
            state.status = 'fullfilled';
            const updatedAgentIndex = state.agents.findIndex((agent)=>{ return agent._id===action.payload._id});
            state.agents[updatedAgentIndex] = action.payload;
            toast.success("Permissions updated successfully", {position:"top-center"});
        })
        .addCase(updateAgentPermission.rejected, (state, action)=>{
            state.status = 'rejected';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(deleteAgent.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(deleteAgent.fulfilled, (state, action)=>{
            state.status = 'fullfilled'
            const deletedAgentIndex = state.agents.findIndex((agent)=>{ return agent._id===action.payload._id});
            state.agents.splice(deletedAgentIndex, 1);
            toast.success("Agent deleted successfully", {position:"top-center"});
        })
        .addCase(deleteAgent.rejected, (state, action)=>{
            state.status = 'rejected';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
    }
})

export default agentSlice.reducer;