import React, { useEffect,useState } from 'react';
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { deleteAProductCategory, getCategories, resetState } from '../features/pcategory/pcategorySlice';
import CustomModel from '../components/CustomModel';

const columns= [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
  
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ];
  



const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId,setpCatId]=useState("")
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getCategories())
  },[]);
  const pCatstat=useSelector((state)=>state.pCategory.pCategories)
  const data1= [];
  for (let i = 0; i < pCatstat.length; i++) {
    data1.push({
      key: i+1,
      name: pCatstat[i].title,
      actions:<>
      <Link className='fs-3 ms-3 text-danger' to={`/admin/category/${pCatstat[i]._id}`}><BiEdit/></Link>
      <button className='fs-3 ms-3 text-danger bg-transparent border-0' onClick={()=>showModal(pCatstat[i]._id)}><AiFillDelete/></button></>
    });
  }
  const deleteCategory=(e)=>{
    setOpen(false);
    dispatch(deleteAProductCategory(e));
    setTimeout(()=>{
      dispatch(getCategories())
    },200)
    
   
  }
  return (
    <div><h3 className='mb-4 title'>Product Categories</h3>

    <div>
        <Table columns={columns} dataSource={data1} />
    </div>
    <CustomModel hideModal={hideModal} 
    open={open} 
    performAction={()=>{deleteCategory(pCatId)}}
    title="Are you sure you want to delete this product category ?"/>
</div>
  )
}

export default Categorylist