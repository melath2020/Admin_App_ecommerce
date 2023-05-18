import React, { useEffect } from 'react';
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux';
import {Link, useLocation} from "react-router-dom"
import { getSingleOrder } from '../features/auth/authSlice';

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
      dataIndex: 'brand',
    },
    {
      title: 'Count',
      dataIndex: 'count',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    
    {
      title: 'Color',
      dataIndex: 'color',
    },
   
    
  ];
  
  

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleorder?.orders);
 

  console.log(orderState);
 

  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product.title,
      brand: orderState?.orderItems[i]?.product.brand,
      count: orderState?.orderItems[i]?.quantity,
      amount: orderState?.orderItems[i]?.price,
      color: orderState?.orderItems[i]?.color?.title,
      
    
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
