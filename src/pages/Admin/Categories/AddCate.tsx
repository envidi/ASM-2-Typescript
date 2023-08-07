import {  useState } from 'react'
import { Button as ButtonAnt, Form, Input, } from 'antd';
import '../../../index.css'
import { api_cate, postMethod } from '../../../ultilities';
import { validateCustomLength } from '../../../AntdComponents/ValidateLength';

import Button  from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

type FieldType = {
  name?: string;
  

};

function AddCate({renderCateData}:{renderCateData:Function}) {
   

  const [contentModal,setContentModal] = useState<{textStatus:string, titleModal: string; descModal: string }>({
    textStatus : 'text-danger',
    titleModal: 'Failed',
    descModal: 'Sign in failed',
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);



  const onFinish = (values: any) => {
    console.log('Success:', values);
    postMethod(api_cate,values,(data:any)=>{
      console.log(data)
      if(data.status == 200 || 201 && data.ok == true){                                
        setContentModal({
          textStatus:'text-success',
          titleModal: 'Success',
          descModal: 'Add cate success!',
        })
        setShow(true)
        renderCateData()
      }else{
         
        setContentModal({
          textStatus:'text-danger',
          titleModal: 'Failure',
          descModal: 'Add cate failed!',
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
    style={{ width :'50%' ,background:'rgb(230, 229, 229)'}}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className='p-3 pt-4 border rounded'
  >
    <Form.Item<FieldType>
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input your product name!',whitespace: true },{
        validator: validateCustomLength(5)
      }]}
    >
      <Input />
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
              <Link className='link' to={'/admin/category'}>Back to list</Link>
            </Button>
          </Modal.Footer>              
      </Modal>
  </div>
  )
}

export default AddCate