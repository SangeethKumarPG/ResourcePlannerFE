import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import { fetchProductsServicesAPI, addProductsServicesAPI, editProductsServicesAPI, deleteProductsServicesAPI } from '../services/allAPI'
export const fetchProductsServices = createAsyncThunk("productsAndServices/fetch",async (_,{rejectWithValue})=>{
    // console.log("Inside fetch");
    try{
        if(sessionStorage.getItem('userData')){
            const token = JSON.parse(sessionStorage.getItem('userData')).token;
            // console.log(token);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            const response = await fetchProductsServicesAPI(headers);
            // console.log(response);
            if(response.status === 200){
                return response.data;
            }else{
                return rejectWithValue({message:response?.response?.data});
            }
        }else{
            return rejectWithValue({message:'Unauthorised'});
        }   
    }catch(error){
        // console.log(error);
        return rejectWithValue({message:"Something went wrong unable to fetch products/services"});
    }
})

export const addProductsServices = createAsyncThunk("productsAndServices/add",async (newProductService, {rejectWithValue})=>{
    try{
        // console.log("inside thunk")
        if(sessionStorage.getItem('userData')){
            const token = JSON.parse(sessionStorage.getItem('userData')).token;
            // console.log(token);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            const response = await addProductsServicesAPI(newProductService, headers);
            if(response.status === 200){
                return response.data;
            }else{
                return rejectWithValue({message:response?.response?.data});
            }
            // console.log(response);
        }else{
            return rejectWithValue({message:'Unauthorised'});
        }
    }catch(error){
        console.log(error);
        return rejectWithValue({message:"Something went wrong unable to add product/service"});
    
    }
})

export const editProductsServices = createAsyncThunk("productsAndServices/edit",async (updateData, {rejectWithValue})=>{
    try{
        if(sessionStorage.getItem('userData')){
            const token = JSON.parse(sessionStorage.getItem('userData')).token;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            const {id, updatedProduct} = updateData;
            const response = await editProductsServicesAPI(updatedProduct, headers,id);
            if(response.status === 200){
                return response.data;
            }else{
                return rejectWithValue({message:response?.response?.data});
            }
        }else{
            return rejectWithValue({message:'Unauthorised'});
        }

    }catch(error){
        return rejectWithValue({message:"Something went wrong unable to update product/service"});
    }
})

export const deleteProductsServices = createAsyncThunk("productsAndServices/delete", async(id, {rejectWithValue})=>{
    try {
        // console.log("Inside delete thunk", id);
        if(sessionStorage.getItem('userData')){
            const token = JSON.parse(sessionStorage.getItem('userData')).token;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            const deleteResponse = await deleteProductsServicesAPI(id, headers);
            if(deleteResponse.status === 200){
                return deleteResponse.data;
            }else{
                return rejectWithValue({message:deleteResponse?.response?.data});
            }
        }else{
            return rejectWithValue({message:'Unauthorised'});
        }
    } catch (error) {
        return rejectWithValue({message:"Something went wrong unable to delete product/service"})
    }
})

const productsAndServicesSlice  = createSlice({
    name : 'productsAndServices',
    initialState : {
        items : [],
        status : 'idle',
        error : null
    },
    reducers:{

    },
    extraReducers : (builder)=>{
        builder.addCase(fetchProductsServices.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchProductsServices.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            state.items = action.payload;
        })
        .addCase(fetchProductsServices.rejected, (state, action)=>{
            state.status ='failed';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"})
        })
        .addCase(addProductsServices.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(addProductsServices.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            console.log(action.payload);
            console.log(state.items);
            state.items.push(action.payload);
            toast.success("Product/Service added successfully", {position:"top-center"});
        })
        .addCase(addProductsServices.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(editProductsServices.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(editProductsServices.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            const index = state.items.findIndex( item=>item._id === action.payload._id);
            state.items[index] = action.payload;
            toast.success("Product/Service details updated", {position:"top-center"})
        })
        .addCase(editProductsServices.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
        .addCase(deleteProductsServices.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(deleteProductsServices.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            state.items = state.items.filter((item)=>{ return item._id!==action.payload._id})
            toast.success("Product/Service deleted successfully", {position:"top-center"});
        })
        .addCase(deleteProductsServices.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.payload?.message;
            toast.error(action.payload?.message, {position:"top-center"});
        })
    }
})


export default productsAndServicesSlice.reducer;