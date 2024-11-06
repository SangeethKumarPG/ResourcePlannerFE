import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCustomersAPI, addCustomerAPI, editCustomerAPI, deleteCustomerAPI } from '../services/allAPI';
import {toast} from 'react-toastify'
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async(_,{rejectWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        try{
            const response = await fetchCustomersAPI(headers);
            if(response.status === 200){
                return response.data;
            }else{
                return rejectWithValue({message:response?.response?.data});
            }
        }catch(error){
            return rejectWithValue({message:"Somthing went wrong, unable to fetch customers"});
        }
    }else{
        rejectWithValue({message:"Unauthorized"});
    }
})

export const addCustomer = createAsyncThunk('customers/addCustomer', async(customer, {rejectWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        try{
            const response = await addCustomerAPI(customer, headers);
            if(response.status === 200){
                return response.data;
            }else{
                return rejectWithValue({message:response?.response?.data});
            }

            return response.data;
        }catch(error){
            return rejectWithValue({message:"Something went wrong, unable to add customer"})
        }
    }else{
        return rejectWithValue({message:"Unauthorized"});
    }
})

export const editCustomer = createAsyncThunk('customers/editCustomer', async(customer, {rejectWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        try{
            const {_id} = customer;
            // console.log("Id inside edit customer thunk",_id);
            const response = await editCustomerAPI(customer, headers, _id);
            if(response.status === 200){
                return response.data;
            }
            else{
                console.log(response?.response)
                return rejectWithValue({message:response?.response?.data});
            }
        }catch(error){
            return rejectWithValue({message:"Something went wrong, unable to edit customer"})
        }
    }else{
        return rejectWithValue({message:"Unauthorized"});
    }
})

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async(customerId, {rejectWithValue})=>{
    if(sessionStorage.getItem('userData')){
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        const headers = {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
        try{
            const response = await deleteCustomerAPI(customerId, headers);
            if(response.status === 200){
                return response.data;
            }else{
                // console.log(response?.response?.data);
                return rejectWithValue({message:response?.response?.data});
            }
            
        }catch(error){
            return rejectWithValue({message:"Something went wrong, unable to delete customer"})
        }
    }else{
        return rejectWithValue({message:"Unauthorized"});
    }
})

const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
        status : 'idle',
        error: null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCustomers.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(fetchCustomers.fulfilled,(state, action)=>{
            state.status = 'fulfilled';
            state.customers = action.payload;
        })
        .addCase(fetchCustomers.rejected, (state, action)=>{
            state.status ='rejected';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(addCustomer.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(addCustomer.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            state.customers.push(action.payload);
            toast.success("Customer added successfully", {position:"top-center"});
        })
        .addCase(addCustomer.rejected, (state, action)=>{
            state.status = 'rejected';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(editCustomer.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(editCustomer.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            const {customers} = state;
            const index = customers.findIndex(customer=>customer._id === action.payload._id);
            if(index !== -1){
                state.customers[index]= action.payload;
            }
            toast.success("Customer updated successfully", {position:"top-center"});
        })
        .addCase(editCustomer.rejected, (state, action)=>{
            state.status = 'rejected';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(deleteCustomer.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(deleteCustomer.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            const {customers} = state;
            const index = customers.findIndex(customer=>customer._id === action.payload._id);
            if(index !== -1){
                state.customers.splice(index, 1);
            }
            toast.success("Customer deleted successfully", {position:"top-center"});
        })
        .addCase(deleteCustomer.rejected, (state, action)=>{
            state.status = 'rejected';
            state.error = action.payload.message;
            toast.error(`Error: ${action.payload.message}`, {position:"top-center"});
        })
    }
})

export default customerSlice.reducer;