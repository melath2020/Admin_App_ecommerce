import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getBlogCategory=async()=>{
    const responce=await axios.get(`${base_url}blogcategory/`)
    
    return responce.data;
}


const createBlogCategory=async(bcat)=>{
    const responce=await axios.post(`${base_url}blogcategory/`,bcat,config)
    
    return responce.data;
}

const bCategoryService={
    getBlogCategory,
    createBlogCategory
}
export default bCategoryService;
