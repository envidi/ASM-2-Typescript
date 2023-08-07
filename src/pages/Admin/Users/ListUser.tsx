import {useState,useEffect} from 'react'
import Button  from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import '../../../admin.css'
import {Id} from '../../../types/cate';
import {  deleteMethod ,api_role, getData, api_user} from '../../../ultilities';
import Modal from 'react-bootstrap/Modal';
import { User,Role } from '../../../types/user';


function ListUser({users,renderUserData}:{users:User[],renderUserData:Function}) {
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const [roles, setRole] = useState<Role[]>([]);
  const [contentModal,setContentModal] = useState<{textStatus:string, titleModal: string; descModal: string }>({
    textStatus : 'text-danger',
    titleModal: 'Failed',
    descModal: 'Sign in failed',
  })
  
  const [getId , setId] = useState<typeof Id>(undefined)
  useEffect(()=>{
    const handleUrl = new URL(api_role)
    getData(handleUrl).then((data)=>{setRole(data)})
  },[])



  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const onHandleDelete = (id:typeof Id)=>{
    setId(id)
    setShow(true)
  }

  const handleDelete = (id:typeof Id)=>{
    deleteMethod(api_user,id,(data:any)=>{
      if(data.status == 200 && data.ok == true){        
                
        renderUserData()
        setContentModal({
          textStatus:'text-success',
          titleModal: 'Success',
          descModal: 'Delete user success!',
        })
        setShow(false)
        setShow1(true)
      }
      else{
       
        setContentModal({
          textStatus:'text-danger',
          titleModal: 'Failure',
          descModal: 'Delete user failed!',
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
          <th>User Name</th>
          <th>Email</th>
          <th>Role</th>         
          <th colSpan={2}>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user,index)=>{
            const {id , username,email  } = user
            const roleUser = roles.find(role=>role.id == user.role )
            
          return (
            <tr key={index}>
            <td>{id}</td>
            <td style={{width :'20%'}}>{username}</td>
            <td style={{width :'25%'}}>{email}</td>                      
            <td style={{width :'25%'}}>{roleUser?.name || 'member'}</td>                      
                             
            <td><Link to={`edit/${id}`}>Edit</Link></td>
            <td style={{width : '10%'}} onClick={()=>onHandleDelete(id)}>Delete</td>
          </tr>
          )
        })}
      
       
       
      </tbody>
    </Table>


    <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Delete  </Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want delete user forever ?</Modal.Body>
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

export default ListUser