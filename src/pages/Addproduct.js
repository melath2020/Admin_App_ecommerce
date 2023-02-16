import { React, useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import {Select} from 'antd';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts } from '../features/product/productSlice';


let schema = Yup.object().shape({
  title: Yup.string().required("Title required"),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Price is required'),
  brand: Yup.string().required('Brand is required'),
  category: Yup.string().required('Category is required'),
  color: Yup.array().required('Colors are required'),
  quantity: Yup.string().required('Quantity is required'),

});
const Addproduct = () => {
  const dispatch = useDispatch()
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    

  }, []);
  
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      value: i._id,
      label: i.title,
    })
  })


    const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url ,
    })
  })


  useEffect(()=>{
    formik.values.color = color;
    formik.values.images = img;
  },[color,img])
  
  const formik = useFormik({
    initialValues: {

      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      quantity: "",
      images:"",

    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values))
    },
  });
  
  const handleColors=(e)=>{
    setColor(e)
  }
  return (
    <div><h3 className='mb-4 title'>Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
          <CustomInput type="text" label="Enter Product Title" name="title" onCh={formik.handleChange('title')}
            onBlr={formik.handleBlur('title')}
            val={formik.values.title} />
          <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>

          <div className='mb-3'>
            <ReactQuill theme="snow" name="description" onChange={formik.handleChange('description')}
              value={formik.values.description} />
            <div className='error'>
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <CustomInput type="number" label="Enter Product Price" name="price" onCh={formik.handleChange('price')}
            onBlr={formik.handleBlur('price')} val={formik.values.price} />
          <div className='error'>
            {formik.touched.price && formik.errors.price}
          </div>
          <select name="brand" onChange={formik.handleChange('brand')}
            onBlur={formik.handleBlur('brand')} value={formik.values.brand} id="" className='form-control py-3 mb-3'>
            <option value="">Select Brand</option>

            {brandState.map((i, j) => {
              return (<option key={j} value={i.title}>{i.title}</option>);
            })}
          </select>
          <div className='error'>
            {formik.touched.brand && formik.errors.brand}
          </div>

          <select name="category" onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')} value={formik.values.category} id="" className='form-control py-3 mb-3'>
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return <option key={j} value={i.title}>{i.title}</option>
            })}
          </select>
          <div className='error'>
            {formik.touched.category && formik.errors.category}
          </div>

          <Select mode="multiple" allowClear className='w-100' placeholder="Select Colors" defaultValue={color}
           onChange={(i)=>handleColors(i)} options={coloropt}/>
          <div className='error'>
            {formik.touched.color && formik.errors.color}
          </div>

          <CustomInput type="number" label="Enter Product Quantity" name="quantity" onCh={formik.handleChange('quantity')}
            onBlr={formik.handleBlur('quantity')} val={formik.values.quantity} />
          <div className='error'>
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
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
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button type="button" onClick={()=>dispatch(delImg(i.public_id))} className="btn-close position-absolute"  style={{top:"10px", right:"10px"}}></button>
                  <img src={i.url} alt="" width={200} height={200}/>
                </div>
              );
            })}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default Addproduct