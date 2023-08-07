import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Product} from '../types/product'
import { Link } from 'react-router-dom';
import '../index.css'
function Main({products }:{products : Product[]}) {
 
  console.log(products)
  return (
    <Row xs={2} md={4}  className='my-3'>
      
      {products.map((pro,index)=>{
        const {id , name , price  , image} = pro
        return (
          
       
          <Col xs={12} sm={6}  md={4} lg={3} key={index}>
          <Card className='shadow p-3 mb-5  rounded'>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title className='fs-5'>{name}</Card.Title>
              <Card.Text className='fs-5 price-color'>
                {price.toLocaleString() + ' VNĐ'}
              </Card.Text>
              <Button variant="primary"><Link style={{color : "white",textDecoration : 'none'}} to={`/product/${id}`}>Xem chi tiết</Link></Button>
            </Card.Body>
          </Card>
          </Col>
          
        )
      })}
  
    
    
    
  </Row>
   
  );
}

export default Main;