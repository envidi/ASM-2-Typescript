import { useState } from 'react';
import '../index.css'
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
import '../admin.css'
import { Outlet } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import '../admin.css'

function AdminLayout() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <>
   <div className="container-fluid">
  <div className="row ">
    <div className="col-lg-3 p-0 col-sm-4 sidebar text-light full-height">
      <div className='mx-3 mt-3 mb-3'> <i className="fa-solid fa-house"></i> Envidi shop  </div>
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
            List product         
          </ListGroup.Item>
          <ListGroup.Item className='item-hover-admin'>
            Add product
          </ListGroup.Item>
    
        </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
    <div className="col-lg-9 col-sm-8 p-0">
    <Stack direction="horizontal" gap={3} className='border'>
      <div className="p-3"><i className="fa-solid fa-bars"></i></div>
      <div className="p-3">Home</div>
      <div className="p-3">Envidi shop</div>
    </Stack>
      <Outlet/>
    </div>
  </div>
</div>






      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
  </>
  )
}

export default AdminLayout
