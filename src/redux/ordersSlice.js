import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addOrderAPI, fetchOrdersAPI, updateOrderAPI, deleteOrderAPI }  from "../services/allAPI";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const addOrder = createAsyncThunk('orders/addOrder', async (order, {rejectWithValue})=>{
    // console.log("Inside addOrder thunk")
    if(sessionStorage.getItem('userData')){
        // console.log("Inside addOrder thunk with token")
        try{
            const token = JSON.parse(sessionStorage.getItem('userData')).token;
            // console.log("Token : ",token)
            const header = {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
            // order.startDate = dayjs(order.startDate).format('DD/MM/YYYY');
            // order.expiryDate = dayjs(order.expiryDate).format('DD/MM/YYYY');
            // console.log("Before submit form data : ",order)
            const response = await addOrderAPI(order, header);
            if(response.status === 201){
                return response.data;
            }else{
                return rejectWithValue({message:response?.response?.data});
            }
        }catch(error){
            return rejectWithValue({message: "Something went wrong unable to add order"});
        }
    }else{
        return rejectWithValue({message: "unauthorized"});
    }
})

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, {rejectWithValue})=>{
    try{
        if(sessionStorage.getItem('userData')){
            const token = JSON.parse(sessionStorage.getItem('userData')).token;
            const header = {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
            const response = await fetchOrdersAPI(header);
            if(response.status === 200){
                return response.data;
            }else{
                return rejectWithValue({message:response?.response?.data});
            }
        }else{
            return rejectWithValue({message: "unauthorized"});
        }
    }catch(error){
        console.log("Error in fetchOrders thunk : ",error)
        return rejectWithValue({message: "Something went wrong unable to fetch orders"});
    }
})

export const renewOrder = createAsyncThunk('orders/renewOrder', async (order, {rejectWithValue})=>{
    try{
        if(sessionStorage.getItem('userData')){
            const token = JSON.parse(sessionStorage.getItem('userData')).token;
            const header = {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
            const {_id} = order;
            const response = await updateOrderAPI(order, header, _id);
            if(response.status === 200){
                return response.data;
            }else{
                return rejectWithValue({message:response?.response?.data});
            }
        }else{
            return rejectWithValue({message:"unauthorized"});
        }
    }catch(error){
        // console.log("Error in renewOrder thunk : ",error)
        return rejectWithValue({message: "Something went wrong unable to renew order"});
    }
})

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id, {rejectWithValue})=>{
    try{
        if(sessionStorage.getItem('userData')){
            const token = JSON.parse(sessionStorage.getItem('userData')).token;
            const header = {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
            const response = await deleteOrderAPI(id, header);
            if(response.status === 200){
                return response.data;
            }else{
                // console.log("Error in deleteOrder thunk : ",response.response.data);
                if(response?.response?.data){
                    return rejectWithValue({message:response?.response?.data})
                }
            }
            
        }else{
            return rejectWithValue({message:"unauthorized"});
        }
    }catch(error){
        console.log("Error in deleteOrder thunk : ",error)
        return rejectWithValue({message: "Something went wrong unable to delete order"});
    }
})

const orderSlice = createSlice({
    name : 'orders',
    initialState : {
        orders:[],
        status: 'idle',
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addOrder.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(addOrder.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            state.orders.push(action.payload);
            toast.success("Order added successfully", {position:"top-center"});
        })
        .addCase(addOrder.rejected, (state, action)=>{
            state.status ='rejected';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(fetchOrders.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(fetchOrders.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            state.orders = action.payload;
        })
        .addCase(fetchOrders.rejected, (state, action)=>{
            state.status ='rejected';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(renewOrder.pending, state=>{
            state.status = 'loading';
        })
        .addCase(renewOrder.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            const index = state.orders.findIndex(order=>order._id === action.payload._id);
            state.orders[index] = action.payload;
            toast.success("Order renewed successfully", {position:"top-center"});
        })
        .addCase(renewOrder.rejected, (state, action)=>{
            state.status ='rejected';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(deleteOrder.pending, state=>{
            state.status = 'loading';
        })
        .addCase(deleteOrder.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            console.log("Action payload in deleteOrder.fulfilled : ",action.payload)
            const index = state.orders.findIndex(order=>order._id === action.payload._id);
            state.orders.splice(index, 1);
            toast.success("Order deleted successfully", {position:"top-center"});
        })
        .addCase(deleteOrder.rejected, (state, action)=>{
            state.status ='rejected';
            state.error = action.payload;
            // console.log(action.payload.message)
            toast.error(action.payload?.message, {position:"top-center"});
        })
    }
})

export default orderSlice.reducer;