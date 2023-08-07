import {  useState,useEffect } from 'react'
import { Button as ButtonAnt, Form, Input,Select } from 'antd';
import {    api_role,   api_user,   getData,   putMethod } from '../../../ultilities';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button  from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../../../index.css'
import '../../../admin.css'
import { User } from '../../../types/user';
import { validateCustomLength } from '../../../AntdComponents/ValidateLength';

type FieldType = {
  username?: string;
  email ?: string;
  password : string;
  role : number
  
};

function UpdateUser({users,renderUserData }:{users:User[],renderUserData:Function}) {
  const [role,setRole] = useState([])
  useEffect(()=>{
    const handleUrl = new URL(api_role)
    getData(handleUrl).then((data:any)=>{
      setRole(data)
            
    })
  },[])

  const [contentModal,setContentModal] = useState<{textStatus:string, titleModal: string; descModal: string }>({
    textStatus : 'text-danger',
    titleModal: 'Failed',
    descModal: 'Update category failed',
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const {id } = useParams()
  // const handleShow = () => setShow(true);

  const user = users.find(user=>user.id == id)

  if(!user)return
  const {username,email,password,role:roleUser} = user
  console.log(roleUser)
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
    putMethod(api_user,values,id,(data:any)=>{
      if(data.status == 200 && data.ok == true){        
                        
        setContentModal({
          textStatus:'text-success',
          titleModal: 'Success',
          descModal: 'Update user success!',
        })
        setShow(true)
        renderUserData()
        
      }else{
         
        setContentModal({
          textStatus:'text-danger',
          titleModal: 'Failure',
          descModal: 'Update user failed!',
        })
        setShow(true)
      }
    })
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='mt-3 d-flex justify-content-center '>
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ width :'60%' ,background:'rgb(230, 229, 229)'}}
    initialValues={{username,email,password,role : roleUser}}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className='p-3 pt-4 border rounded'
   

  >
     <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your user name!',whitespace: true },{
        validator:validateCustomLength(5)
      }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!',whitespace: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType> 
    label="Role" 
    name='role' 
    rules={[{ required: true, message: 'Please input your user role!' }]}
    >
          <Select>
            {role.map(ca=>{
              const {id ,name} = ca
              return (
                <Select.Option key={id} value={id}>{name}</Select.Option>
              )
            })}
        
          </Select>
        </Form.Item>

   
                 

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <ButtonAnt type="primary" htmlType="submit">
        Submit
      </ButtonAnt>
    </Form.Item>
  </Form>

      <Modal show={show}  onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className={contentModal.textStatus} >{contentModal.titleModal}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{contentModal.descModal}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> 
            <Button variant="primary" className='button-back-list' >
              <Link className='link' to={'/admin/user'}>Back to list</Link>
            </Button>
          </Modal.Footer>              
      </Modal>
  </div>
  )
}

export default UpdateUser