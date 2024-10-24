import { BASE_URL } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//login API
export const loginAPI = async(userDetails)=>{
    return await commonAPI("POST",`${BASE_URL}/login`,userDetails,"");
}

//fetch products and services
export const fetchProductsServicesAPI = async(header)=>{
    return await commonAPI("GET",`${BASE_URL}/products-and-services`,"",header);
}

// add products and services
export const addProductsServicesAPI = async(productsServiceDetails, header)=>{
    // console.log("Inside all api")
    return await commonAPI("POST",`${BASE_URL}/products-and-services`,productsServiceDetails,header);
}

// edit products and services
export const editProductsServicesAPI = async(productsServiceDetails,header, id)=>{
    return await commonAPI("PUT",`${BASE_URL}/products-and-services/${id}`,productsServiceDetails,header);
}

export const deleteProductsServicesAPI = async(id, header)=>{
    return await commonAPI("DELETE",`${BASE_URL}/products-and-services/${id}`,{},header);
}

//fetch all customers
export const fetchCustomersAPI = async(header)=>{
    return await commonAPI("GET",`${BASE_URL}/customers`,{},header);
}

//add customer
export const addCustomerAPI = async(customerDetail, header)=>{
    return await commonAPI("POST",`${BASE_URL}/customers`,customerDetail,header)
}

//edit customer
export const editCustomerAPI = async(customerDetail, header, id)=>{
    return await commonAPI("PUT",`${BASE_URL}/customers/${id}`,customerDetail,header)
}
//delete customer
export const deleteCustomerAPI = async(id, header)=>{
    return await commonAPI("DELETE",`${BASE_URL}/customers/${id}`,{},header)
}

//add order
export const addOrderAPI = async(orderDetail, header)=>{
    return await commonAPI("POST",`${BASE_URL}/orders`,orderDetail,header)
}   

// get all orders
export const fetchOrdersAPI = async(header)=>{
    return await commonAPI("GET",`${BASE_URL}/orders`,{},header)
}


