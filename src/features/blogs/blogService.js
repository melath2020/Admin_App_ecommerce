import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBlogs=async()=>{
    const responce=await axios.get(`${base_url}blog/`)
    
    return responce.data;
}


const blogService={
    getBlogs,
}
export default blogService;
