import { configureStore } from "@reduxjs/toolkit";
import productsAndServicesReducer from "./productsAndServicesSlice";

const store = configureStore({
    reducer:{
        productsAndServices: productsAndServicesReducer
    }
})

export default store;