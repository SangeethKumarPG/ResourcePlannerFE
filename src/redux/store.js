import { configureStore } from "@reduxjs/toolkit";
import productsAndServicesReducer from "./productsAndServicesSlice";
import customerSliceReducer from "./customerSlice";
import ordersSliceReducer from "./ordersSlice";

const store = configureStore({
    reducer:{
        productsAndServices: productsAndServicesReducer,
        customers: customerSliceReducer,
        orders: ordersSliceReducer
    }
})

export default store;