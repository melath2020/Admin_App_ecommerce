import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getEnquiries=async()=>{
    const responce=await axios.get(`${base_url}enquiry/`)
    
    return responce.data;
}

const getEnquiry=async(id)=>{
    const responce=await axios.get(`${base_url}enquiry/${id}`,config)
    
    return responce.data;
}

const updateEnquiry=async(enq)=>{
    const responce=await axios.put(`${base_url}enquiry/${enq.id}`,{status:enq.enqData},config)
    
    return responce.data;
}

const deleteEnquiry=async(id)=>{
    const responce=await axios.delete(`${base_url}enquiry/${id}`,config)
    
    return responce.data;
}



const enquiryService={
    getEnquiries,
    getEnquiry,
    updateEnquiry,
    deleteEnquiry
}
export default enquiryService;
