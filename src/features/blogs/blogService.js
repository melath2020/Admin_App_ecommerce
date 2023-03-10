import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getBlogs=async()=>{
    const responce=await axios.get(`${base_url}blog/`)
    
    return responce.data;
}

const createBlogs=async(blog)=>{
    const responce=await axios.post(`${base_url}blog/`,blog,config)
    
    return responce.data;
}

const getBlog=async(id)=>{
    const responce=await axios.get(`${base_url}blog/${id}`,config)
    
    return responce.data;
}

const updateBlog=async(blog)=>{
    const responce=await axios.put(`${base_url}blog/${blog.id}`,{title:blog.blogData.title,description:blog.blogData.description,category:blog.blogData.category,images:blog.blogData.images},config)
    
    return responce.data;
}

const deleteBlog=async(id)=>{
    const responce=await axios.delete(`${base_url}blog/${id}`,config)
    
    return responce.data;
}


const couponService={
    getBlogs,
    createBlogs,
    getBlog,
    updateBlog,
    deleteBlog
    
}
export default couponService;
