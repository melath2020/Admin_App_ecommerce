import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getProducts=async()=>{
    const responce=await axios.get(`${base_url}product/`)
    
    return responce.data;
}


const productService={
    getProducts,
}
export default productService;
