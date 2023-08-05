import { useState } from 'react';
import '../index.css'
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../admin.css'

function AdminLayout() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
   <div className="container-fluid">
  <div className="row p-0">
    <div className="col-lg-3 col-sm-5 sidebar text-light full-height">
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Product</Accordion.Header>
        <Accordion.Body>
        <ListGroup>
          <ListGroup.Item className='item-hover-admin'>
            List product         
          </ListGroup.Item>
          <ListGroup.Item>
            Add product
          </ListGroup.Item>
    
        </ListGroup>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Categories</Accordion.Header>
        <Accordion.Body>
        
        <ListGroup>
          <ListGroup.Item>
            List product         
          </ListGroup.Item>
          <ListGroup.Item>
            Add product
          </ListGroup.Item>
    
        </ListGroup>

        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Users</Accordion.Header>
        <Accordion.Body>
            <Button variant="primary" onClick={handleShow}>
             Launch
            </Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
    <div className="col-lg-9 col-sm-7">
      vd
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
