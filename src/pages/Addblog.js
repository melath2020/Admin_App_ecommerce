import { React, useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getCategories } from '../features/bcategory/bcategorySlice';
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBlogs } from '../features/blogs/blogSlice';
import { toast } from 'react-toastify';

let schema = Yup.object().shape({
    title: Yup.string().required("Title required"),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),

});

const Addblog = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getCategories());


    }, []);

    const imgState = useSelector((state) => state.upload.images);
    const bCateState = useSelector((state) => state.bCategory.bCategories)
    const newBlog = useSelector((state) => state.blogs);
    const {isSuccess,isError,isLoading,createdBlog}=newBlog;

    useEffect(()=>{
        if(isSuccess && createdBlog){
          toast.success("Product Added Successfully");
        }
        if(isError){
          toast.error("Something went Wrong");
        }
      },[isSuccess,isError,isLoading])




    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        })
    })


    useEffect(() => {

        formik.values.images = img;
    }, [img])

    const formik = useFormik({
        initialValues: {

            title: "",
            description: "",
            category: "",
            images: ""


        },
        validationSchema: schema,
        onSubmit: (values) => {
            
              dispatch(createBlogs(values))
            formik.resetForm();

            setTimeout(() => {
                navigate('/admin/blog-list')
            }, 3000)
        },
    });


    return (
        <div>
            <h3 className='mb-4 title'>Add Blog </h3>

            <div className=''>
                <form onSubmit={formik.handleSubmit}>

                    <div className="mt-4">
                        <CustomInput type='text' label='Enter Blog Title' name="title" onCh={formik.handleChange('title')}
                            onBlr={formik.handleBlur('title')}
                            val={formik.values.title} />
                    </div>
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <select name="category" onChange={formik.handleChange('category')}
                        onBlur={formik.handleBlur('category')} value={formik.values.category} className='form-control py-3  mt-3'>
                        <option value="">Select Blog Category</option>
                        {bCateState.map((i, j) => {
                            return <option key={j} value={i.title}>{i.title}</option>
                        })}
                    </select>
                    <div className='error'>
                        {formik.touched.category && formik.errors.category}
                    </div>
                    <ReactQuill className="mt-3" theme="snow" name="description" onChange={formik.handleChange('description')}
                        value={formik.values.description} />
                    <div className='error'>
                        {formik.touched.description && formik.errors.description}
                    </div>

                    <div className="bg-white border-1 p-5 text-center mt-3">
                        <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                              <div className="showimages d-flex flex-wrap mt-3 gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button type="button" onClick={()=>dispatch(delImg(i.public_id))} className="btn-close position-absolute"  style={{top:"10px", right:"10px"}}></button>
                  <img src={i.url} alt="" width={200} height={200}/>
                </div>
              );
            })}
          </div>
                    <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Blog</button>
                </form>
            </div>
        </div>
    )
}

export default Addblog