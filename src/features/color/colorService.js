import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getEnquiries=async()=>{
    const responce=await axios.get(`${base_url}enquiry/`)
    
    return responce.data;
}


const enquiryService={
    getEnquiries,
}
export default enquiryService;
