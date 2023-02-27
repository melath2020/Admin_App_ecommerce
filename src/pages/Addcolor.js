import { React, useEffect } from 'react'
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createColor, resetState } from '../features/color/colorSlice';

let schema = Yup.object().shape({
  title: Yup.string().required("Color is required"),


});
const Addcolor = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const newColor = useSelector((state) => state.color);
  const {isSuccess,isError,isLoading,createdColor}=newColor;
  useEffect(()=>{
    if(isSuccess && createdColor){
      toast.success("Color Added Successfully");
    }
    if(isError){
      toast.error("Something went Wrong");
    }
  },[isSuccess,isError,isLoading,createdColor])
  
  const formik = useFormik({
    initialValues: {

      title: "",
     
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColor(values))
      formik.resetForm();
      
      setTimeout(()=> {
        dispatch(resetState())
        navigate('/admin/list-color')
      },3000)
    },
  });
  return (
    <div>
        <h3 className='mb-4 title'>
            Add Color
        </h3>
        <div>
            <form  onSubmit={formik.handleSubmit}>
                <CustomInput type='color' id="color" label="Enter Product Color" name="title" onCh={formik.handleChange('title')} val={formik.values.title} 
                onBlr={formik.handleBlur('title')}/>
                  <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>
                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Color</button>
            </form>
        </div>
    </div>
  )
}

export default Addcolor