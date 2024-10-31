import { configureStore } from "@reduxjs/toolkit";
import productsAndServicesReducer from "./productsAndServicesSlice";
import customerSliceReducer from "./customerSlice";
import ordersSliceReducer from "./ordersSlice";
import ticketSliceReducer from './ticketSlice';
import agentSliceReducer from './agentSlice';

const store = configureStore({
    reducer:{
        productsAndServices: productsAndServicesReducer,
        customers: customerSliceReducer,
        orders: ordersSliceReducer,
        tickets: ticketSliceReducer,
        agents: agentSliceReducer
    }
})

export default store;