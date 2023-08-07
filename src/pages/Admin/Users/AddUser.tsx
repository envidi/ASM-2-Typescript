import {  useState,useEffect } from 'react'
import '../../../index.css'
import {  api_role, api_user, getData, postMethod } from '../../../ultilities';
import { Button as ButtonAnt, Form, Input,  Select, } from 'antd';
import Button  from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { validateCustomLength } from '../../../AntdComponents/ValidateLength';

type FieldType = {
  username?: string;
  email ?: string;
  password : string;
  role : number
  
};

function AddUser({renderUserData}:{renderUserData:Function}) {
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
    descModal: 'Sign in failed',
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);



  const onFinish = (values: any) => {
    console.log('Success:', values);
    postMethod(api_user,values,(data:any)=>{
      console.log(data)
      if(data.status == 200 || 201 && data.ok == true){                                
        setContentModal({
          textStatus:'text-success',
          titleModal: 'Success',
          descModal: 'Add user success!',
        })
        setShow(true)
        renderUserData()
      }else{
         
        setContentModal({
          textStatus:'text-danger',
          titleModal: 'Failure',
          descModal: 'Add user failed!',
        })
        setShow(true)
      }
    })
   
  };
  
  const validateLength = (_:any, value:any) => {
    if (value && value.length < 3) {
      return Promise.reject('Ít nhất 3 kí tự');
    }
    return Promise.resolve();
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
    style={{ width :'50%' ,background:'rgb(230, 229, 229)'}}
    initialValues={{ role : 3 }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className='p-3 pt-4 border rounded'
   
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your user name!',whitespace: true, },  {
        validator: validateLength,
      },]}
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
      rules={[{ required: true, message: 'Please input your password!',whitespace: true },{
        validator:validateCustomLength(6)
      }]}
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
            <Button variant="primary" className='button-back-list' onClick={()=>{}}>
              <Link className='link' to={'/admin/user'}>Back to list</Link>
            </Button>
          </Modal.Footer>              
      </Modal>
  </div>
  )
}

export default AddUser