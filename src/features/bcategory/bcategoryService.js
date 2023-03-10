import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getBlogCategories=async()=>{
    const responce=await axios.get(`${base_url}blogcategory/`)
    
    return responce.data;
}


const createBlogCategory=async(bcat)=>{
    const responce=await axios.post(`${base_url}blogcategory/`,bcat,config)
    
    return responce.data;
}

const getBlogCategory=async(id)=>{
    const responce=await axios.get(`${base_url}blogcategory/${id}`,config)
    
    return responce.data;
}

const updateBlogCategory=async(blogCat)=>{
    const responce=await axios.put(`${base_url}blogcategory/${blogCat.id}`,{title:blogCat.blogCatData.title},config)
    
    return responce.data;
}

const deleteBlogCategory=async(id)=>{
    const responce=await axios.delete(`${base_url}blogcategory/${id}`,config)
    
    return responce.data;
}

const bCategoryService={
    getBlogCategories,
    createBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory
}
export default bCategoryService;
