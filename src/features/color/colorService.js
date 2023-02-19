import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getColors=async()=>{
    const responce=await axios.get(`${base_url}color/`)
    
    return responce.data;
}

const createColor=async(color)=>{
    const responce=await axios.post(`${base_url}color/`,color ,config)
    
    return responce.data;
}


const colorService={
    getColors,
    createColor
}
export default colorService;
