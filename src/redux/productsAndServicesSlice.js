import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { fetchProductsServicesAPI, addProductsServicesAPI, editProductsServicesAPI } from '../services/allAPI'
export const fetchProductsServices = createAsyncThunk("productsAndServices/fetch",async (_,{rejectWithValue})=>{
    console.log("Inside fetch");
    try{
        if(sessionStorage.getItem('userData')){
            const token = JSON.parse(sessionStorage.getItem('userData')).token;
            console.log(token);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            const response = await fetchProductsServicesAPI(headers);
            console.log(response);
            return response.data;
        }else{
            return rejectWithValue('Unauthorised');
        }   
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

export const addProductsServices = createAsyncThunk("productsAndServices/add",async (newProductService, {rejectWithValue})=>{
    try{
        console.log("inside thunk")
        if(sessionStorage.getItem('userData')){
            const token = JSON.parse(sessionStorage.getItem('userData')).token;
            console.log(token);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            const response = await addProductsServicesAPI(newProductService, headers);
            console.log(response);
            return response.data;
        }else{
            return rejectWithValue('Unauthorised');
        }
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    
    }
})

export const editProductsServices = createAsyncThunk("productsAndServices/edit",async (updatedProductService, {rejectWithValue})=>{
    try{
        const {id, ...productData} = updatedProductService;
        const response = await editProductsServicesAPI(productData, id);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
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
        })
        .addCase(addProductsServices.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(editProductsServices.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(editProductsServices.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            const index = state.items.findIndex( item=>item.id === action.payload.id);
            state.items[index] = action.payload;
        })
        .addCase(editProductsServices.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export default productsAndServicesSlice.reducer;