import React , { useEffect } from 'react';
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import {Link} from "react-router-dom"
const columns= [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'title',
    },
     {
      title: 'Actions',
      dataIndex: 'actions',
    },
    
   
  ];
  



const Brandlist = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getBrands())
  },[])
  const brandState=useSelector((state)=>state.brand.brands)
  const data1= [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i+1,
      title:brandState[i].title,
      actions:<>
      <Link className='fs-3 ms-3 text-danger' to="/"><BiEdit/></Link>
      <Link className='fs-3 ms-3 text-danger' to="/"><AiFillDelete/></Link></>
    });
  }
  return (
    <div><h3 className='mb-4 title'>Brands</h3>

    <div>
        <Table columns={columns} dataSource={data1} />
    </div>
</div>
  )
}

export default Brandlist