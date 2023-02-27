import { React, useEffect } from 'react'
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCoupon, resetState } from '../features/coupon/couponSlice';

let schema = Yup.object().shape({
  name: Yup.string().required("Coupon Name is required"),
  expiry: Yup.string().required("Expiry Date is required"),
  discount: Yup.string().required("Discount is required"),
});

const Addcoupon = () => {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const newCoupon = useSelector((state) => state.coupon);
  const {isSuccess,isError,isLoading,createdCoupon}=newCoupon;
  useEffect(()=>{
    if(isSuccess && createdCoupon){
      toast.success("Coupon Added Successfully");
    }
    if(isError){
      toast.error("Something went Wrong");
    }
  },[isSuccess,isError,isLoading])
  
  const formik = useFormik({
    initialValues: {

      name: "",
      expiry:"",
      discount:""
     
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupon(values))
      formik.resetForm();
      
      setTimeout(()=> {
        dispatch(resetState())
        navigate('/admin/coupon-list')
      },3000)
    },
  });
  
  return (
    <div>
        <h3 className='mb-4 title'>
            Add Coupon
        </h3>
        <div>
            <form  onSubmit={formik.handleSubmit}>
          <CustomInput type='text' label="Enter Name" id="name" name="name" onCh={formik.handleChange('name')} val={formik.values.name}
            onBlr={formik.handleBlur('name')} />
          <div className='error'>
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput type='date' label="Enter Expiry Date" id="date" name="expiry" onCh={formik.handleChange('expiry')} val={formik.values.expiry}
            onBlr={formik.handleBlur('expiry')} />
          <div className='error'>
            {formik.touched.expiry && formik.errors.expiry}
          </div>

          <CustomInput type='number' label="Enter Discount" id="discount" name="discount" onCh={formik.handleChange('discount')} val={formik.values.discount}
            onBlr={formik.handleBlur('discount')} />
          <div className='error'>
            {formik.touched.discount && formik.errors.discount}
          </div>
                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Coupon</button>
            </form>
        </div>
    </div>
  )
}

export default Addcoupon