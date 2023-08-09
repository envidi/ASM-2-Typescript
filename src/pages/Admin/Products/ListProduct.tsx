import {useState} from 'react'
import Button  from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import '../../../admin.css'
import {Product,Id} from '../../../types/product';
import { api_url, deleteMethod } from '../../../ultilities';
import Modal from 'react-bootstrap/Modal';


function ListProduct({products,renderProductData}:{products:Product[],renderProductData:any}) {
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const [contentModal,setContentModal] = useState<{textStatus:string, titleModal: string; descModal: string }>({
    textStatus : 'text-danger',
    titleModal: 'Failed',
    descModal: 'Sign in failed',
  })
  
  const [getId , setId] = useState<typeof Id>(undefined)



  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const onHandleDelete = (id:typeof Id)=>{
    setId(id)
    setShow(true)
  }

  const handleDelete = (id:typeof Id)=>{
    deleteMethod(api_url,id,(data:any)=>{
      if(data.status == 200 && data.ok == true){        
                
        renderProductData()
        setContentModal({
          textStatus:'text-success',
          titleModal: 'Success',
          descModal: 'Delete product success!',
        })
        setShow(false)
        setShow1(true)
      }
      else{
       
        setContentModal({
          textStatus:'text-danger',
          titleModal: 'Failure',
          descModal: 'Delete product failed!',
        })
        setShow(false)
        setShow1(true)
      }
    })
  }

  return (
    <div className='container-fluid mt-3'>
         <Table striped bordered hover size='sm' responsive="lg" className='fs-7'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Desc</th>
          <th>Image</th>
          <th>Cate_id</th>
          <th colSpan={2}>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((pro,index)=>{
            const {id , name , price ,description : desc , image , category_id } = pro
            
            const priceNumber = price?.number || price
          return (
            <tr key={index}>
              <td>{id}</td>
              <td style={{width :'25%'}}>{name}</td>
              <td style={{width :'15%'}}>{priceNumber.toLocaleString()  + 'VNĐ'}</td>
              <td style={{width :'30%'}}>{desc}</td>
              <td><img src={image} width={40}/></td>
              <td>{category_id}</td>
              <td><Link to={`edit/${id}`}>Edit</Link></td>
              <td style={{width : '6%'}} onClick={()=>onHandleDelete(id)}>Delete</td>
          </tr>
          )
        })}
      
       
       
      </tbody>
    </Table>


    <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Delete  </Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want delete product forever ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> 
          <Button variant="primary" onClick={()=>{handleDelete(getId)}}>
            Delete
          </Button>
        </Modal.Footer>              

      </Modal>

      <Modal show={show1}  onHide={handleClose}>
       
        
        <Alert show={show1} variant="success" className='mb-0'>
        <Alert.Heading className={contentModal.textStatus}>My Alert</Alert.Heading>
        <p>
           {contentModal.descModal}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow1(false)} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>

      </Modal>

     

      {/* {show1 && <Button onClick={() => setShow1(true)}>Show Alert</Button>} */}
    </div>
  )
}

export default ListProduct