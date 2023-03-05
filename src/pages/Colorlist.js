import React, { useEffect,useState } from 'react';
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { deleteAColor, getColors, resetState } from '../features/color/colorSlice';
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
  
  


const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId,setcolorId]=useState("")
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getColors())
  },[])
  const colorState=useSelector((state)=>state.color.colors);
  const data1= [];
  for (let i = 0; i <colorState.length; i++) {
    data1.push({
      key: i+1,
      name:colorState[i].title,
      actions:<>
      <Link className='fs-3 ms-3 text-danger' to={`/admin/color/${colorState[i]._id}`}><BiEdit/></Link>
      <button className='fs-3 ms-3 text-danger bg-transparent border-0' onClick={()=>showModal(colorState[i]._id)}><AiFillDelete/></button></>
    });
  }
  const deleteColor=(e)=>{
    setOpen(false);
     dispatch(deleteAColor(e));
    console.log(e);
    setTimeout(()=>{
      dispatch(getColors())
    },200)
    dispatch(getColors())
   
  }
  return (
    <div><h3 className='mb-4 title'>Colors</h3>

    <div>
        <Table columns={columns} dataSource={data1} />
    </div>
    <CustomModel  hideModal={hideModal} 
    open={open} 
    performAction={()=>{deleteColor(colorId)}}
    title="Are you sure you want to delete this Color ?"/>
</div>
  )
}

export default Colorlist