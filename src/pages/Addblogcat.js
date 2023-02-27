import { React, useEffect } from 'react'
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBlogCategory, resetState } from '../features/bcategory/bcategorySlice.js';



let schema = Yup.object().shape({
  title: Yup.string().required("Category Name is required"),


});

const Addblogcat = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const newBlogCategory = useSelector((state) => state.bCategory);
  const {isSuccess,isError,isLoading,createdBlogCategory}=newBlogCategory;
  useEffect(()=>{
    if(isSuccess && createdBlogCategory){
      toast.success("Blog Category Added Successfully");
    }
    if(isError){
      toast.error("Something went Wrong");
    }
  },[isSuccess,isError,isLoading,createdBlogCategory])
  
  const formik = useFormik({
    initialValues: {

      title: "",
     
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogCategory(values))
      formik.resetForm();
      
      setTimeout(()=> {
        dispatch(resetState())
        navigate('/admin/blog-category-list')
      },3000)
    },
  });
  
  return (
    <div>
        <h3 className='mb-4 title'>
            Add Blog Category
        </h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput type='text' label="Enter Blog Category" name="title" onCh={formik.handleChange('title')} val={formik.values.title} 
                onBlr={formik.handleBlur('title')} id="blogcat"/>
                <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>
                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Blog Category</button>
            </form>
        </div>
    </div>
  )
}

export default Addblogcat