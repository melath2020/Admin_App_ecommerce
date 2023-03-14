import React, { useEffect } from 'react';
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { getOrders } from '../features/auth/authSlice';

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
      title: 'Products',
      dataIndex: 'product',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
    
  ];
  
  

const Orders = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getOrders())
  },[])
  const orderState=useSelector((state)=>state.auth.orders);
  const data1= [];
  for (let i = 0; i <orderState.length; i++) {
    data1.push({
      key: i+1,
      name:orderState[i].orderby.firstname,
      product:<Link to={`/admin/order/${orderState[i].orderby._id}`}>View Orders</Link>,
      amount:orderState[i].paymentIntent.amount,
      date:new Date(orderState[i].createdAt).toLocaleString(),

      actions:<>
      <Link className='fs-3 ms-3 text-danger' to="/"><BiEdit/></Link>
      <Link className='fs-3 ms-3 text-danger' to="/"><AiFillDelete/></Link></>
    });
  }
  return (
    <div><h3 className='mb-4'>Orders</h3>

    <div>
        <Table columns={columns} dataSource={data1} />
    </div>
</div>
  )
}

export default Orders