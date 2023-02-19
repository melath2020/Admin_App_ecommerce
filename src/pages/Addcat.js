import { React, useEffect } from 'react'
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCategory } from '../features/pcategory/pcategorySlice';
let schema = Yup.object().shape({
  title: Yup.string().required("Category Name is required"),

});
const Addcat = () => {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const newCategory = useSelector((state) => state.pCategory);
  const {isSuccess,isError,isLoading,createdCategory}=newCategory;
  useEffect(()=>{
    if(isSuccess && createdCategory){
      toast.success("Category Added Successfully");
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
      dispatch(createCategory(values))
      formik.resetForm();
      
      setTimeout(()=> {
        navigate('/admin/list-category')
      },3000)
    },
  });
  return (
    <div>
        <h3 className='mb-4 title'>
            Add Category
        </h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput type='text' label="Enter Product Category" name="title" onCh={formik.handleChange('title')} val={formik.values.title}
                onBlr={formik.handleBlur('title')}/>
              <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>
                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Category</button>
            </form>
        </div>
    </div>
  )
}

export default Addcat