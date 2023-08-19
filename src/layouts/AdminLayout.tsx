import { useEffect, useState } from 'react';
import '../index.css'
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
import '../admin.css'
import { Outlet } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import { api_role, getData, jsonParse } from '../ultilities';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Image from 'react-bootstrap/Image';
import '../admin.css'
import '../../breakpoint.css'
import { Role } from '../types/user';


function AdminLayout() {
  const user  = jsonParse(localStorage.getItem('user'));
  const [roles, setRole] = useState<Role[]>([]);
  
  let roleUser
  useEffect(()=>{
    const handleUrl = new URL(api_role)
    getData(handleUrl).then((data)=>{setRole(data)})
   
    // console.log(roles)
  },[])
  if(roles){

    roleUser = roles.find(role=>role.id == user.user.role )
  }
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <ThemeProvider
  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  minBreakpoint="xxs"
>
   <div className="container-fluid">
  <div className="row ">
    <div className="col-lg-3 p-0 col-sm-3 d-custom-xs-none d-md-block sidebar text-light full-height">
      <div className='mx-3 mt-3 mb-3'> <i className="fa-solid fa-house"></i> Envidi shop  </div>
      <Dropdown.Divider style={{background :'white',height:'1px', opacity: 0.5}} />
    <Accordion defaultActiveKey={['0']} alwaysOpen flush  className='bg-sidebar-admin'>
      <Accordion.Item eventKey="0" className='bg-sidebar-admin'>
        <Accordion.Header className='bg-sidebar-admin text-light-admin'>Product</Accordion.Header>
        <Accordion.Body>
        <ListGroup>
          <ListGroup.Item className='item-hover-admin'>
           <Link  className='link' to={'product/list'}>List product</Link>  
          </ListGroup.Item>
          <ListGroup.Item className='item-hover-admin'>
           <Link  className='link' to={'product/add'}> Add product</Link>  
           
          </ListGroup.Item>
          
    
        </ListGroup>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1" className='bg-sidebar-admin'>
        <Accordion.Header className='bg-sidebar-admin text-light-admin'>Categories</Accordion.Header>
        <Accordion.Body>
        
        <ListGroup>
          <ListGroup.Item className='item-hover-admin'>
            <Link  className='link' to={'category'}>   List Cate</Link>  
          </ListGroup.Item>
          <ListGroup.Item className='item-hover-admin'>        
            <Link  className='link' to={'category/add'}> Add Cate</Link>  
          </ListGroup.Item>
    
        </ListGroup>

        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2" className='bg-sidebar-admin '>
        <Accordion.Header className='bg-sidebar-admin text-light-admin'>Users</Accordion.Header>
        <Accordion.Body>
        <ListGroup>
          <ListGroup.Item className='item-hover-admin'>
             <Link  className='link' to={'user'}>List User</Link>  
          </ListGroup.Item>
          <ListGroup.Item className='item-hover-admin'>
            <Link  className='link' to={'user/add'}>Add User</Link>
          </ListGroup.Item>
    
        </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
    <div className="col-md-9 col-sm-12 p-0">
    <Stack direction="horizontal" gap={3} className='border'>
      <div className="p-3">
        <Button variant="primary" onClick={handleShow} className='d-custom-xs-block d-md-none'>
         <i className="fa-solid fa-bars"></i>
        </Button>
        <i className="fa-solid fa-bars d-custom-xs-none d-md-block"></i>
      </div>
      <div className="p-3">Home</div>
      <div className="p-3">Envidi shop</div>
      <div className="p-3">{user?.user?.username || null}</div>
      <div className="">{roleUser?.name || null}</div>
    </Stack>
      <Outlet/>
    </div>
  </div>
</div>






      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Envidi shop <Image src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1691390839/logo-shop-laptop_tqmezj.png" width={50} rounded /></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='pt-0'>
        <div className='mx-3 mb-3'> <i className="fa-solid fa-house"></i> Home  </div>
      <Dropdown.Divider style={{background :'white',height:'1px', opacity: 0.5}} />
    <Accordion defaultActiveKey={['0']} alwaysOpen flush  className='bg-sidebar-admin'>
      <Accordion.Item eventKey="0" className='bg-sidebar-admin'>
        <Accordion.Header className='bg-sidebar-admin text-light-admin'>Product</Accordion.Header>
        <Accordion.Body>
        <ListGroup>
          <ListGroup.Item className='item-hover-admin'>
           <Link  className='link' to={'product'}>List product</Link>  
          </ListGroup.Item>
          <ListGroup.Item className='item-hover-admin'>
           <Link  className='link' to={'product/add'}> Add product</Link>  
           
          </ListGroup.Item>
          
    
        </ListGroup>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1" className='bg-sidebar-admin'>
        <Accordion.Header className='bg-sidebar-admin text-light-admin'>Categories</Accordion.Header>
        <Accordion.Body>
        
        <ListGroup>
          <ListGroup.Item className='item-hover-admin'>
            <Link  className='link' to={'category'}>   List Cate</Link>  
          </ListGroup.Item>
          <ListGroup.Item className='item-hover-admin'>        
            <Link  className='link' to={'category/add'}> Add Cate</Link>  
          </ListGroup.Item>
    
        </ListGroup>

        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2" className='bg-sidebar-admin '>
        <Accordion.Header className='bg-sidebar-admin text-light-admin'>Users</Accordion.Header>
        <Accordion.Body>
        <ListGroup>
          <ListGroup.Item className='item-hover-admin'>
             <Link  className='link' to={'user'}>List User</Link>  
          </ListGroup.Item>
          <ListGroup.Item className='item-hover-admin'>
            <Link  className='link' to={'user/add'}>Add User</Link>
          </ListGroup.Item>
    
        </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
      </ThemeProvider>
  </>
  )
}

export default AdminLayout
