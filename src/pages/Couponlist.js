import React , { useEffect } from 'react';
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux';
import { getAllCoupon } from '../features/coupon/couponSlice';
import {Link} from "react-router-dom"
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
      title: 'Discount',
      dataIndex: 'discount',
    },
    {
      title: 'Expiry',
      dataIndex: 'expiry',
    },
     {
      title: 'Actions',
      dataIndex: 'actions',
    },
    
   
  ];
  



const Couponlist = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getAllCoupon())
  },[])
  const couponState=useSelector((state)=>state.coupon.coupons)
  const data1= [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i+1,
      name:couponState[i].name,
      discount:couponState[i].discount,
      expiry:new Date(couponState[i].expiry).toLocaleString(),
      actions:<>
      <Link className='fs-3 ms-3 text-danger' to="/"><BiEdit/></Link>
      <Link className='fs-3 ms-3 text-danger' to="/"><AiFillDelete/></Link></>
    });
  }
  return (
    <div><h3 className='mb-4 title'>Coupons</h3>

    <div>
        <Table columns={columns} dataSource={data1} />
    </div>
</div>
  )
}

export default Couponlist