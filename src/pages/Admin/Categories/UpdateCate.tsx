import {  useState } from 'react'
import { Button as ButtonAnt, Form, Input, } from 'antd';
import { api_cate,   putMethod } from '../../../ultilities';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button  from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Cate } from '../../../types/cate';
import '../../../index.css'
import '../../../admin.css'

type FieldType = {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category_id ?: number

};

function UpdateCate({cates,renderCateData }:{cates:Cate[],renderCateData:Function}) {

  const [contentModal,setContentModal] = useState<{textStatus:string, titleModal: string; descModal: string }>({
    textStatus : 'text-danger',
    titleModal: 'Failed',
    descModal: 'Update category failed',
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const {id } = useParams()
  // const handleShow = () => setShow(true);

  const cate = cates.find(cate=>cate.id == id)

  if(!cate)return
  const {name} = cate
  
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
    putMethod(api_cate,values,id,(data:any)=>{
      if(data.status == 200 && data.ok == true){        
                        
        setContentModal({
          textStatus:'text-success',
          titleModal: 'Success',
          descModal: 'Update category success!',
        })
        setShow(true)
        renderCateData()
        
      }else{
         
        setContentModal({
          textStatus:'text-danger',
          titleModal: 'Failure',
          descModal: 'Update category failed!',
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
    style={{ background:'rgb(230, 229, 229)'}}
    initialValues={{name}}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className='p-sm-4 pt-md-4 p-custom-xs-5 border rounded col-lg-6 col-custom-xs-11 mx-custom-xs-auto col-sm-10 mb-custom-xs-3 '
   

  >
    <Form.Item<FieldType>
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input your product name!',whitespace: true }]}
    >
      <Input  />
    </Form.Item>
                 

    <Form.Item className='breakpoint-form'>
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
              <Link className='link' to={'/admin/category'}>Back to list</Link>
            </Button>
          </Modal.Footer>              
      </Modal>
  </div>
  )
}

export default UpdateCate