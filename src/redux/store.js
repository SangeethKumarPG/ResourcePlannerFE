import { configureStore } from "@reduxjs/toolkit";
import productsAndServicesReducer from "./productsAndServicesSlice";
import customerSliceReducer from "./customerSlice";
import ordersSliceReducer from "./ordersSlice";
import ticketSliceReducer from './ticketSlice';

const store = configureStore({
    reducer:{
        productsAndServices: productsAndServicesReducer,
        customers: customerSliceReducer,
        orders: ordersSliceReducer,
        tickets: ticketSliceReducer
    }
})

export default store;