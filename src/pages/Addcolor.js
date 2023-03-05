import { React, useEffect } from 'react'
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createColor, getAColor, resetState, updateAColor  } from '../features/color/colorSlice';

let schema = Yup.object().shape({
  title: Yup.string().required("Color is required"),


});
const Addcolor = () => {
  const dispatch=useDispatch();
  const location=useLocation();
  const getColorId=location.pathname.split('/')[3];
  const navigate=useNavigate();
  const newColor = useSelector((state) => state.color);
  const {isSuccess,isError,isLoading,createdColor,colorName,updatedColor}=newColor;
  
  useEffect(()=>{
    if(getColorId !== undefined){
      dispatch(getAColor(getColorId));
    
      
    }else{
      dispatch(resetState())
    }
  },[getColorId])
  
  useEffect(()=>{
    if(isSuccess && createdColor){
      toast.success("Color Added Successfully");
    }
    if(updatedColor && isSuccess ){
      toast.success("Color Updated Successfully");
      navigate('/admin/list-color');
    }
    if(isError){
      toast.error("Something went Wrong");
    }
  },[isSuccess,isError,isLoading,createdColor])
  
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {

      title: colorName || "",
     
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getColorId!==undefined){
        const data={id:getColorId,colorData:values}
        dispatch(updateAColor(data))
      }else{
        dispatch(createColor(values))
        formik.resetForm();
        
        setTimeout(()=> {
          dispatch(resetState())
          navigate('/admin/list-color')
        },300)
      }
     
    },
  });
  return (
    <div>
        <h3 className='mb-4 title'>
        {getColorId!==undefined ? "Edit" : "Add"}  Color
        </h3>
        <div>
            <form  onSubmit={formik.handleSubmit}>
                <CustomInput type='color' id="color" label="Enter Product Color" name="title" onCh={formik.handleChange('title')} val={formik.values.title} 
                onBlr={formik.handleBlur('title')}/>
                  <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>
                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">{getColorId!==undefined ? "Update" : "Add"} Color</button>
            </form>
        </div>
    </div>
  )
}

export default Addcolor