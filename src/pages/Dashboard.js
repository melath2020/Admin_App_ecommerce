import React, { useState } from 'react'
import {BsArrowDownRight,BsArrowDownLeft,BsArrowUpRight}from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMonthlyData, getOrders, getYearlyData } from '../features/auth/authSlice';




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
    title: 'Product Count',
    dataIndex: 'product',
  },
  {
    title: 'Total Price',
    dataIndex: 'price',
  },
  {
    title: 'Total Price After Discount',
    dataIndex: 'dprice',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];




const Dashboard = () => {
  const dispatch=useDispatch()
  const monthlyDataState=useSelector(state=>state?.auth?.monthlyData)
  const yearlyDataState=useSelector(state=>state?.auth?.yearlyData)
  const orderState=useSelector(state=>state?.auth?.orders.orders)
  const [dataMonthly,setDataMonthly]=useState([])
  const [dataMonthlySales,setDataMonthlySales]=useState([])
  const [orderData,setorderData]=useState([])
  console.log(orderData)
  useEffect(()=>{
    
    dispatch(getMonthlyData())
    dispatch(getYearlyData())
    dispatch(getOrders())
    
  },[])
 
  
  useEffect(()=>{
    let monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let data=[]
    let monthlyOrderCount=[]
    
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({type:monthNames[element?._id?.month],income:element?.amount})
      monthlyOrderCount.push({type:monthNames[element?._id?.month],sales:element?.count})
    }
    setDataMonthly(data)
    setDataMonthlySales(monthlyOrderCount)
   
    
  const data1= [];
for (let i = 0; i < orderState?.length; i++) {
  data1.push({
    key: i,
    name:orderState[i]?.user?.firstname?orderState[i]?.user?.firstname:" " ,
    product: orderState[i]?.orderItems?.length,
    price: orderState[i]?.totalPrice,
    dprice: orderState[i]?.totalPriceAfterDiscount,
    status: orderState[i]?.orderStatus,
  });

}
setorderData(data1)
  },[monthlyDataState,yearlyDataState])

  const config = {
    data:dataMonthly,
    xField: 'type',
    yField: 'income',
    color: ({ type }) => {
      return "#ffd333";
    },

    label: {
     
      position: 'middle',
    
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Months',
      },
      sales: {
        alias: 'Income',
      },
    },
  };

  const config2 = {
    data:dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return "#ffd333";
    },

    label: {
     
      position: 'middle',
    
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Months',
      },
      sales: {
        alias: 'sales',
      },
    },
  };
  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex p-3 justify-content-between align-items-end  flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className="desc">Total Income</p>
            <h4 className='mb-0 sub-title'>$ {yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
          
            <p className="mb-0 desc">Income in Last Year from Today</p>
          </div>
        </div>
        <div className='d-flex p-3 justify-content-between align-items-end  flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className="desc">Total Sales</p><h4 className='mb-0 sub-title'>$ {yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
         
            <p className='mb-0 desc'>Sales in Last Year from Today</p>
          </div>
        </div>
       
      </div>
      
     <div className='d-flex justiy-content-between gap-3'>
     <div className="mt-4 flex-grow-1 w-50 ">
          <h3 className="mb-5">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50 ">
          <h3 className="mb-5">Sales Statics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
     </div>
        <div className="mt-4">
          <h3 className="mb-5">
            Recent Orders
          </h3>
          <div>
            <Table columns={columns} dataSource={orderData} />
          </div>
        </div>
      

    </div>
  )
}

export default Dashboard