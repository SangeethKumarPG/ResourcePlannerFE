import { configureStore } from "@reduxjs/toolkit";
import productsAndServicesReducer from "./productsAndServicesSlice";
import customerSliceReducer from "./customerSlice";

const store = configureStore({
    reducer:{
        productsAndServices: productsAndServicesReducer,
        customers: customerSliceReducer
    }
})

export default store;