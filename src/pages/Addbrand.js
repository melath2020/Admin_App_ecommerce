import { React, useEffect } from 'react'
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBrand } from '../features/brand/brandSlice';

let schema = Yup.object().shape({
  title: Yup.string().required("Brand Name is required"),


});

const Addbrand = () => {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const newBrand = useSelector((state) => state.brand);
  const {isSuccess,isError,isLoading,createdBrand}=newBrand;
  useEffect(()=>{
    if(isSuccess && createdBrand){
      toast.success("Brand Added Successfully");
    }
    if(isError){
      toast.error("Something went Wrong");
    }
  },[isSuccess,isError,isLoading])
  
  const formik = useFormik({
    initialValues: {

      title: "",
     
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrand(values))
      formik.resetForm();
      
      setTimeout(()=> {
        navigate('/admin/list-brand')
      },3000)
    },
  });
  
  return (
    <div>
        <h3 className='mb-4 title'>
            Add Brand
        </h3>
        <div>
            <form  onSubmit={formik.handleSubmit}>
                <CustomInput type='text' label="Enter Brand" name="title" onCh={formik.handleChange('title')} val={formik.values.title} 
                onBlr={formik.handleBlur('title')}/>
                <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>
                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Brand</button>
            </form>
        </div>
    </div>
  )
}

export default Addbrand