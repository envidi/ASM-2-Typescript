import {useState} from 'react'
import Button  from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import '../../../admin.css'
import {Cate,Id} from '../../../types/cate';
import { api_cate, deleteMethod } from '../../../ultilities';
import Modal from 'react-bootstrap/Modal';


function ListCate({cates,renderCateData}:{cates:Cate[],renderCateData:Function}) {
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
    deleteMethod(api_cate,id,(data:any)=>{
      if(data.status == 200 && data.ok == true){        
                
        renderCateData()
        setContentModal({
          textStatus:'text-success',
          titleModal: 'Success',
          descModal: 'Delete category success!',
        })
        setShow(false)
        setShow1(true)
      }
      else{
       
        setContentModal({
          textStatus:'text-danger',
          titleModal: 'Failure',
          descModal: 'Delete category failed!',
        })
        setShow(false)
        setShow1(true)
      }
    })
  }

  return (
    <div className='container-fluid mt-3'>
         <Table striped bordered hover size='lg' responsive="lg" className='fs-7'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Category Name</th>
         
          <th colSpan={2}>Action</th>
        </tr>
      </thead>
      <tbody>
        {cates.map((cate,index)=>{
            const {id , name  } = cate
            
          
          return (
            <tr key={index}>
            <td>{id}</td>
            <td style={{width :'25%'}}>{name}</td>
           
           
            <td><Link to={`edit/${id}`}>Edit</Link></td>
            <td style={{width : '20%'}} onClick={()=>onHandleDelete(id)}>Delete</td>
          </tr>
          )
        })}
      
       
       
      </tbody>
    </Table>


    <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Delete  </Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want delete category forever ?</Modal.Body>
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

export default ListCate