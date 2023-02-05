import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getProductCategory=async()=>{
    const responce=await axios.get(`${base_url}category/`)
    
    return responce.data;
}


const pCategoryService={
    getProductCategory,
}
export default pCategoryService;
