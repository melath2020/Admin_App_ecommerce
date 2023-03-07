import React , { useEffect,useState } from 'react';
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux';
import { deleteACoupon, getAllCoupon, resetState } from '../features/coupon/couponSlice';
import {Link} from "react-router-dom";
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
  const [open, setOpen] = useState(false);
  const [couponId,setcouponId]=useState("")
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(resetState())
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
      <Link className='fs-3 ms-3 text-danger'  to={`/admin/coupon/${couponState[i]._id}`}><BiEdit/></Link>
      <button className='fs-3 ms-3 text-danger bg-transparent border-0' onClick={()=>showModal(couponState[i]._id)}><AiFillDelete/></button></>
    });
  }
  const deleteCoupon=(e)=>{
    setOpen(false);
     dispatch(deleteACoupon(e));
    setTimeout(()=>{
      dispatch(getAllCoupon())
     },200);

   
  }
  return (
    <div><h3 className='mb-4 title'>Coupons</h3>

    <div>
        <Table columns={columns} dataSource={data1} />
    </div>
    <CustomModel  hideModal={hideModal} 
    open={open} 
    performAction={()=>{deleteCoupon(couponId)}}
    title="Are you sure you want to delete this Coupon ?"/>
</div>
  )
}

export default Couponlist