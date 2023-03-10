import { React, useEffect } from 'react'
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBlogCategory, getAblogCat, resetState, updateAblogCat } from '../features/bcategory/bcategorySlice.js';



let schema = Yup.object().shape({
  title: Yup.string().required("Category Name is required"),


});

const Addblogcat = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation()
  const getBlogCatId=location.pathname.split('/')[3];
  const newBlogCategory = useSelector((state) => state.bCategory);
  const {isSuccess,isError,isLoading,createdBlogCategory,blogCatName,updatedBlogCategory}=newBlogCategory;
  useEffect(()=>{
    if(getBlogCatId !== undefined){
      dispatch(getAblogCat(getBlogCatId));
    
      
    }else{
      dispatch(resetState())
    }
  },[getBlogCatId])
  
  useEffect(()=>{
    if(isSuccess && createdBlogCategory){
      toast.success("Blog Category Added Successfully");
    }
    if(isSuccess && updatedBlogCategory){
      toast.success("Blog Category Updated Successfully");
      navigate('/admin/blog-category-list')
    }
    if(isError){
      toast.error("Something went Wrong");
    }
  },[isSuccess,isError,isLoading,createdBlogCategory,updatedBlogCategory])
  
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {

      title: blogCatName || "",
     
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getBlogCatId!==undefined){
        const data={id:getBlogCatId,blogCatData:values}
        dispatch(updateAblogCat(data))
      }else{
        dispatch(createBlogCategory(values))
        formik.resetForm();
        
        setTimeout(()=> {
          dispatch(resetState())
          navigate('/admin/blog-category-list')
        },300)
      }
      
    },
  });
  
  return (
    <div>
        <h3 className='mb-4 title'>
        {getBlogCatId!==undefined ? "Edit" : "Add"} Blog Category
        </h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput type='text' label="Enter Blog Category" name="title" onCh={formik.handleChange('title')} val={formik.values.title} 
                onBlr={formik.handleBlur('title')} id="blogcat"/>
                <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>
                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">{getBlogCatId!==undefined ? "Update" : "Add"} Blog Category</button>
            </form>
        </div>
    </div>
  )
}

export default Addblogcat