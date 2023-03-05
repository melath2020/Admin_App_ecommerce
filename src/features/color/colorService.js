import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getColors=async()=>{
    const responce=await axios.get(`${base_url}color/`)
    
    return responce.data;
}

const createColor=async(color)=>{
    const responce=await axios.post(`${base_url}color/`,color ,config)
    
    return responce.data;
}

const getColor=async(id)=>{
    const responce=await axios.get(`${base_url}color/${id}`,config)
    
    return responce.data;
}

const updateColor=async(color)=>{
    const responce=await axios.put(`${base_url}color/${color.id}`,{title:color.colorData.title},config)
    
    return responce.data;
}

const deleteColor=async(id)=>{
    const responce=await axios.delete(`${base_url}color/${id}`,config)
    
    return responce.data;
}


const colorService={
    getColors,
    createColor,
    getColor,
    updateColor,
    deleteColor
}
export default colorService;
