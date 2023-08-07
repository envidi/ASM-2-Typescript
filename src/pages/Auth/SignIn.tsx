import { useState } from 'react';
import Button  from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Button as AntdButton, Checkbox, Form, Input } from 'antd';
import { api_signin, signMethod } from '../../ultilities';
import { validateCustomLength } from '../../AntdComponents/ValidateLength';




type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  email?: string;
};

const SignIn = ({handleSignIn}:{handleSignIn: any,isLogin:boolean}) => {
 
    const [show, setShow] = useState(false);
    const [contentModal,setContentModal] = useState<{ titleModal: string; descModal: string,textStatus: string }>({
      titleModal: 'Failed',
      descModal: 'Sign in failed',
      textStatus: 'text-danger'
    })
    const onFinish = (values: any) => {
      
      
      signMethod(api_signin,values,(datas:any)=>{
        if(typeof datas ==='string'){
          setContentModal({
            titleModal: 'Failed',
            descModal: `${datas}. Sign in failed!`,
            textStatus: 'text-danger'
          })
          setShow(true)
        }
        else{
          setContentModal({
            titleModal: 'Success',
            descModal: 'Sign in success!',
            textStatus: 'text-success'
          })
          setShow(true)  
          handleSignIn(datas);              
        }
      })
  
    };
   
    
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
 
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
    <div style={{width : '100%',display:'flex',justifyContent:'center'}}>
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className='form-auth col-md-6 col-sm-9'
    >
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
        rules={[{ required: true, message: 'Please input your password!' },{ validator : validateCustomLength(5)}]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <AntdButton type="primary" htmlType="submit">
          Submit
        </AntdButton>
      </Form.Item>
    </Form>

   

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>{contentModal.titleModal }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{contentModal.descModal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
   
    </div>
  ) };

export default SignIn;