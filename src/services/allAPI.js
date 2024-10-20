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
    console.log("Inside all api")
    return await commonAPI("POST",`${BASE_URL}/products-and-services`,productsServiceDetails,header);
}

// edit products and services
export const editProductsServicesAPI = async(productsServiceDetails, id)=>{
    return await commonAPI("PUT",`${BASE_URL}/products-and-services/${id}`,productsServiceDetails,"");
}