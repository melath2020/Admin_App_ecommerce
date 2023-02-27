import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getCoupons=async()=>{
    const responce=await axios.get(`${base_url}coupon/`)
    
    return responce.data;
}

const createCoupon=async(coupon)=>{
    const responce=await axios.post(`${base_url}coupon/`,coupon,config)
    
    return responce.data;
}


const couponService={
    getCoupons,
    createCoupon
}
export default couponService;
