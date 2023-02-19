import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getProductCategory=async()=>{
    const responce=await axios.get(`${base_url}category/`)
    
    return responce.data;
}

const createCategory=async(category)=>{
    const responce=await axios.post(`${base_url}category/`,category,config)
    
    return responce.data;
}


const pCategoryService={
    getProductCategory,
    createCategory
}
export default pCategoryService;
