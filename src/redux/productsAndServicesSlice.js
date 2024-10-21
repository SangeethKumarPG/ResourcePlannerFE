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
            return response.data;
        }else{
            return rejectWithValue('Unauthorised');
        }   
    }catch(error){
        // console.log(error);
        return rejectWithValue(error.response.data);
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
            // console.log(response);
            return response.data;
        }else{
            return rejectWithValue('Unauthorised');
        }
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    
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
            return response.data;
        }else{
            return rejectWithValue('Unauthorised');
        }

    }catch(error){
        return rejectWithValue(error.response.data);
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
            return deleteResponse.data;
        }else{
            return rejectWithValue('Unauthorised');
        }
    } catch (error) {
        rejectWithValue(error.response.data)
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
            state.error = action.payload;
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
            state.error = action.payload;
            toast.error(action.payload.message, {position:"top-center"});
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
            state.error = action.error.message;
            toast.error(action.error.message, {position:"top-center"});
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
            state.error = action.error.message;
            toast.error(action.error.message, {position:"top-center"});
        })
    }
})


export default productsAndServicesSlice.reducer;