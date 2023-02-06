import axios from 'axios';
import { base_url } from '../../utils/base_url';
const getTokenFromLocalStorage=localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null;

const config={
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage.token}` ,
        Accept:"Application/json",
      }
}
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
