import {  useEffect,useState } from 'react'
import { Button as ButtonAnt, Form, Input, InputNumber, Select, } from 'antd';
import { api_cate, api_url, getData,  putMethod } from '../../../ultilities';
import { Product } from '../../../types/product';
import { useParams } from 'react-router-dom';
import PriceInput from '../../../AntdComponents/PriceInput';
import Modal from 'react-bootstrap/Modal';
import Button  from 'react-bootstrap/Button';
import {checkPrice2} from '../../../AntdComponents/CheckPrice';
import { Link } from 'react-router-dom';
import '../../../index.css'
import '../../../admin.css'

type FieldType = {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category_id ?: number

};

function UpdateProduct({products,renderProductData }:{products:Product[],renderProductData:Function}) {

  const [contentModal,setContentModal] = useState<{textStatus:string, titleModal: string; descModal: string }>({
    textStatus : 'text-danger',
    titleModal: 'Failed',
    descModal: 'Sign in failed',
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const {id } = useParams()
  // const handleShow = () => setShow(true);

  const product = products.find(pro=>pro.id == id)

  if(!product)return
  const {name, price , description, image,category_id} = product
  
  
  const [cate,setCate] = useState([])

  useEffect(()=>{
    const handleUrl = new URL(api_cate)
    getData(handleUrl).then((data:any)=>{
      setCate(data)
            
    })
  },[])

 

  const onFinish = (values: any) => {
    console.log('Success:', values);
    putMethod(api_url,values,id,(data:any)=>{
      if(data.status == 200 && data.ok == true){        
                
        
        setContentModal({
          textStatus:'text-success',
          titleModal: 'Success',
          descModal: 'Update product success!',
        })
        setShow(true)
        renderProductData()
        
      }else{
         
        setContentModal({
          textStatus:'text-danger',
          titleModal: 'Failure',
          descModal: 'Update product failed!',
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
    initialValues={{  name,  price: price,description,image,category_id}}
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

    <Form.Item<FieldType>
      label="Price"
      name="price"
      rules={[{ required: true, message: 'Please input your price!', validator: checkPrice2 }]} 
   
    >
     
     <InputNumber    style={{width : '100%'}} />
    </Form.Item>  

    <Form.Item<FieldType>
       label="Description"
      name="description"
      rules={[{ required: true, message: 'Please input your description!',whitespace: true }]}
      
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Image"
      name="image"
      rules={[{ required: true, message: 'Please input your image!' ,whitespace: true}]}
    >
     <Input />
   
    </Form.Item>
    <Form.Item<FieldType>
      label="Image"
      name="image"
    >
     <img src={image} width={40}/>
    </Form.Item>

    <Form.Item<FieldType> 
    label="Select"
    name='category_id'
    rules={[{ required: true, message: 'Please input your category!' }]}
    >
          <Select>
            {cate.map(ca=>{
              const {id ,name} = ca
              return (
                <Select.Option key={id} value={id}>{name}</Select.Option>
              )
            })}
        
          </Select>
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
            <Button variant="primary" className='button-back-list' onClick={()=>{}}>
              <Link className='link' to={'/admin/product'}>Back to list</Link>
            </Button>
          </Modal.Footer>              
      </Modal>
  </div>
  )
}

export default UpdateProduct