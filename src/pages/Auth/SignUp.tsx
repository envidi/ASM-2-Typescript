import { Button as AntdButton, Checkbox, Form, Input } from 'antd';
import Modal from 'react-bootstrap/Modal';
import Button  from 'react-bootstrap/Button';
import { useState } from 'react';
import { api_signup } from '../../ultilities';
import {Link} from 'react-router-dom'
import { signMethod } from '../../ultilities';
import {validateCustomLength} from '../../AntdComponents/ValidateLength';



type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  confirm?: string;
  email?: string;
};

const SignUp = () => {

  const [show, setShow] = useState(false);
  const [contentModal,setContentModal] = useState<{ titleModal: string; descModal: string,textStatus: string }>({
    titleModal: 'Failed',
    descModal: 'Sign in failed',
    textStatus : 'text-danger'
  })
  const handleClose = () => setShow(false);
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
    signMethod(api_signup,values,( data:any )=>{
      if(typeof data ==='string'){
          setContentModal({
            textStatus : 'text-danger',
            titleModal: 'Failed',
            descModal: `${data}. Sign up failed!`,
          })
          setShow(true)
      }
      else{
        
        setContentModal({
          textStatus:'text-success',
          titleModal: 'Success',
          descModal: ` Sign up Success!`,
        })
        setShow(true)  
      }
    })
    
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };



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
    <Form.Item<FieldType>
      label="Username"
      name='username'
      rules={[{ required: true, message: 'Please input your username!' }]}
      // {...register("username")}
      hasFeedback 
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
      rules={[{ required: true, message: 'Please input your password!' }, {
        validator: validateCustomLength(5),
      }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item<FieldType>
      label="Confirm password"
      name="confirm"
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The new password that you entered do not match!'));
          },
        }),
      ]}
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
          <Button variant="primary" onClick={handleClose}>            
            <Link to={'/signin'}>Back to sign in</Link>
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
  };

export default SignUp;