import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBrands=async()=>{
    const responce=await axios.get(`${base_url}brand/`)
    
    return responce.data;
}


const brandService={
    getBrands,
}
export default brandService;
