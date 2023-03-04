import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getProductCategories=async()=>{
    const responce=await axios.get(`${base_url}category/`)
    
    return responce.data;
}

const createCategory=async(category)=>{
    const responce=await axios.post(`${base_url}category/`,category,config)
    
    return responce.data;
}

const getProductCategory=async(id)=>{
    const responce=await axios.get(`${base_url}category/${id}`,config)
    
    return responce.data;
}

const updateProductCategory=async(category)=>{
    const responce=await axios.put(`${base_url}category/${category.id}`
    ,{title:category.pCatData.title}
    ,config)
    
    return responce.data;
}

const deleteProductCategory=async(id)=>{
    const responce=await axios.delete(`${base_url}category/${id}`,config)
    
    return responce.data;
}



const pCategoryService={
    getProductCategories,
    createCategory,
    getProductCategory,
    deleteProductCategory,
    updateProductCategory
}
export default pCategoryService;
