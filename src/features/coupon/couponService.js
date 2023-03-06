import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getCoupons=async()=>{
    const responce=await axios.get(`${base_url}coupon/`,config)
    
    return responce.data;
}

const createCoupon=async(coupon)=>{
    const responce=await axios.post(`${base_url}coupon/`,coupon,config)
    
    return responce.data;
}

const getCoupon=async(id)=>{
    const responce=await axios.get(`${base_url}coupon/${id}`,config)
    
    return responce.data;
}

const updateCoupon=async(coupon)=>{
    const responce=await axios.put(`${base_url}coupon/${coupon.id}`,{title:coupon.couponData.title},config)
    
    return responce.data;
}

const deleteCoupon=async(id)=>{
    const responce=await axios.delete(`${base_url}coupon/${id}`,config)
    
    return responce.data;
}



const couponService={
    getCoupons,
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}
export default couponService;
