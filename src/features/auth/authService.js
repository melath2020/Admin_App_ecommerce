import axios from 'axios';
import { base_url } from '../../utils/base_url';

const login=async(userData)=>{
    const responce=await axios.post(`${base_url}user/admin-login`,userData)
    if(responce.data){
        localStorage.setItem('user',JSON.stringify(responce.data))
    }
    return responce.data;
}


const authService={
    login,
}
export default authService;
