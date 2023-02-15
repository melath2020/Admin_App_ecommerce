import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';


const login=async(user)=>{
    const responce=await axios.post(`${base_url}user/admin-login`,user)
    if(responce.data){
        localStorage.setItem('user',JSON.stringify(responce.data))
    }
    return responce.data;
}

const getOrders=async()=>{
    
    const responce=await axios.get(`${base_url}user/getallorders`,config)
    
    return responce.data;
}


const authService={
    login,
    getOrders
}
export default authService;
