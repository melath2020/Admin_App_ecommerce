import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getColors=async()=>{
    const responce=await axios.get(`${base_url}color/`)
    
    return responce.data;
}


const colorService={
    getColors,
}
export default colorService;
