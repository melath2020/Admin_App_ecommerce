import React , { useEffect,useState }from 'react';
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { deleteAblogCat, getAblogCat, getCategories, resetState } from '../features/bcategory/bcategorySlice';
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
  
  

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId,setblogCatId]=useState("")
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getCategories())
  },[]);
  const bCatstat=useSelector((state)=>state.bCategory.bCategories)
  const data1= [];
  for (let i = 0; i < bCatstat.length; i++) {
    data1.push({
      key: i+1,
      name: bCatstat[i].title,
      actions:<>
      <Link className='fs-3 ms-3 text-danger'to={`/admin/blog-category/${bCatstat[i]._id}`}><BiEdit/></Link>
      <button className='fs-3 ms-3 text-danger bg-transparent border-0' onClick={()=>showModal(bCatstat[i]._id)}><AiFillDelete/></button></>
    });
  }
  const deleteBlogCat=(e)=>{
    setOpen(false);
    dispatch(deleteAblogCat(e));
    setTimeout(()=>{
      dispatch(getCategories())
    },200)
   
   
  }
  return (
    <div><h3 className='mb-4 title'>Blog Categories</h3>

          <div>
              <Table columns={columns} dataSource={data1} />
          </div>
          <CustomModel hideModal={hideModal}
        open={open}
        performAction={() => { deleteBlogCat(blogCatId) }}
        title="Are you sure you want to delete this blog category?" />
    </div>
      
  )
}

export default Blogcatlist