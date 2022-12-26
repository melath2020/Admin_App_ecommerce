import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
 
} from '@ant-design/icons';
import {AiOutlineDashboard,AiOutlineShoppingCart,AiOutlineUser,AiOutlineBgColors} from 'react-icons/ai'
import {SiBrandfolder } from 'react-icons/si';
import {BiCategoryAlt } from 'react-icons/bi';
import {FaClipboardList,FaBloggerB } from 'react-icons/fa';
import {ImBlog } from 'react-icons/im';
import { Layout, Menu, theme } from 'antd';
import { useNavigate,Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate =useNavigate();
  return (
    <Layout>
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" >
        <h2 className="text-white fs-5 text-center py-3">
          <span className='sm-logo'>PM</span>
          <span className='lg-logo'>Pix-Mart</span></h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['']}
        onClick={({key})=>{
              if(key=='signout'){

              }else{
                navigate(key);
              }
          }
          
        }

        
        items={[
          {
            key: '',
            icon: <AiOutlineDashboard className="fs-4" />,
            label: 'Dashboard',
          },
          {
            key: 'customers',
            icon: <AiOutlineUser  className="fs-4"/>,
            label: 'Customers',
          },
          {
            key: 'Catelog',
            icon: <AiOutlineShoppingCart className="fs-4"/>,
            label: 'Catalog',
            children:[
              {
                key: 'product',
                icon: <AiOutlineShoppingCart   className="fs-4"/>,
                label: 'Add Product',
              },
              {
                key: 'product-list',
                icon: <AiOutlineShoppingCart  className="fs-4"/>,
                label: 'Product List ',
              },
              {
                key: 'category',
                icon: <SiBrandfolder className="fs-4"/>,
                label: 'Brand ',
              },
              {
                key: 'list-category',
                icon: <SiBrandfolder className="fs-4"/>,
                label: 'Brand List ',
              },
              {
                key: 'category',
                icon: <BiCategoryAlt className="fs-4"/>,
                label: 'Category ',
              },
              {
                key: 'list-category',
                icon: <BiCategoryAlt className="fs-4"/>,
                label: 'Category List ',
              },
              {
                key: 'color',
                icon: <AiOutlineBgColors className="fs-4"/>,
                label: 'Color ',
              },
              {
                key: 'list-color',
                icon: <AiOutlineBgColors className="fs-4"/>,
                label: 'Color List ',
              },
            ],
          },
          {
            key: 'orders',
            icon: <FaClipboardList className="fs-4"/>,
            label: 'Orders ',
          },
          {
            key: 'blog',
            icon: <FaBloggerB className="fs-4"/>,
            label: 'Blogs ',
            children:[
              {
                
                  key: 'blog',
                  icon: <ImBlog className="fs-4"/>,
                  label: 'Add Blog',
                
              },
              {
                
                key: 'blog-list',
                icon: <FaBloggerB className="fs-4"/>,
                label: 'Blog List',
              
            },
              {
                
                key: 'blog-category',
                icon: <ImBlog className="fs-4"/>,
                label: 'Add Blog Category',
              
            },
            {
                
              key: 'blog-category-list',
              icon: <FaBloggerB className="fs-4"/>,
              label: 'Blog Category List',
            
          },
            ]
          },

          {
            key: 'enquiries',
            icon: <FaClipboardList className="fs-4"/>,
            label: 'Enquiries ',
          },
         
        ]}

      />
    </Sider>
    <Layout className="site-layout">
      <Header className='d-flex justify-content-between ps-1 pe-5' style={{ padding: 0, background: colorBgContainer }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
        <div className='justify-content-end'>
          <h1>hgg</h1>
        </div>
      </Header>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Outlet/>
      </Content>
    </Layout>
  </Layout>
  )
}

export default MainLayout