import { BASE_URL } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//login API
export const loginAPI = async(userDetails)=>{
    return await commonAPI("POST",`${BASE_URL}/login`,userDetails,"");
}