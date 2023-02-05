import React, { useEffect } from 'react';
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux';
import { getBlogs } from '../features/blogs/blogSlice';
import {Link} from "react-router-dom"

const columns= [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ];
  
 

const Bloglist = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
      dispatch(getBlogs())
  },[]);
  const getBlogState=useSelector((state)=>state.blogs.blogs )
  const data1= [];
  for (let i = 0; i < getBlogState.length; i++) {
    data1.push({
      key: i+1,
      name: getBlogState[i].title,
      category:getBlogState[i].category,
      actions:<>
      <Link className='fs-3 ms-3 text-danger' to="/"><BiEdit/></Link>
      <Link className='fs-3 ms-3 text-danger' to="/"><AiFillDelete/></Link></>
    });
  }
  return (
    <div><h3 className='mb-4 title'>Blogs List</h3>

          <div>
              <Table columns={columns} dataSource={data1} />
          </div>
      </div>
  )
}

export default Bloglist