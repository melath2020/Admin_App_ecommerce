import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBlogCategory=async()=>{
    const responce=await axios.get(`${base_url}blogcategory/`)
    
    return responce.data;
}


const bCategoryService={
    getBlogCategory,
}
export default bCategoryService;
