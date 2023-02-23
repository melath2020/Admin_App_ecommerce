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


const blogService={
    getBlogs,
    createBlogs
    
}
export default blogService;
