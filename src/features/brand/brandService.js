import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getBrands=async()=>{
    const responce=await axios.get(`${base_url}brand/`)
    
    return responce.data;
}

const createBrand=async(brand)=>{
    const responce=await axios.post(`${base_url}brand/`,brand,config)
    
    return responce.data;
}


const brandService={
    getBrands,
    createBrand
}
export default brandService;
