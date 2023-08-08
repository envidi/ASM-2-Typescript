import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Product} from '../types/product'
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import '../index.css'
function Main({products }:{products : Product[]}) {
 
  return (
    <Row xs={2} md={4}  className='my-3'>
      {products ? (

        <>
          {products.map((pro,index)=>{
        const {id , name , price  , image,rate} = pro
        const priceNumber = price?.number || price
        return (
                           
          <Col xs={12} sm={6}  md={4} lg={3} key={index}>
          <Card className='shadow p-3 mb-5  rounded'>
            <Card.Img variant="top" src={image} />
            <Card.Body className='pt-0 pb-0 '>
              <Rate disabled defaultValue={rate} />
              <Card.Title className='fs-6'>{name}</Card.Title>
              <Card.Text className='price-color'>
                {priceNumber.toLocaleString() + ' VNĐ'}
              </Card.Text>
              <div className='d-flex justify-content-between'>
              <Button variant="primary"><Link style={{color : "white",textDecoration : 'none'}} to={`/product/${id}`}>See detail</Link></Button>
              
              <Button variant="link" className='px-0'><Link style={{textDecoration : 'none'}} to={`/product/${id}`}><i className="fa-solid fa-cart-shopping"></i></Link></Button>
              </div>
            </Card.Body>
          </Card>
          </Col>
          
        )
      })}
        </>

      ) : ( <div>Product is not available</div>)

    }
      
    
  
    
    
    
  </Row>
   
  );
}

export default Main;