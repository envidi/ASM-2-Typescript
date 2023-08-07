import Figure from 'react-bootstrap/Figure';
import {Product} from '../types/product'
import { useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

function DetailPage({products }:{products : Product[]}) {
    const {id} = useParams()
    const product = products.find(pro=>pro.id == id)
    if(!product){
        return
    }
    const {name,image, price , description : desc } = product
  return (
   <>
   <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item >
      <Link style={{textDecoration:'none'}} to={'/product'}>Product</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{name}</Breadcrumb.Item>
    </Breadcrumb>
   <div className="d-flex justify-content-center my-5">
    <Figure className='d-flex flex-column align-items-center'>
      <Figure.Image
        className='align-middle'
        width={271}
        height={'auto'}
        alt="171x180"
        src={image}
      />
      <Figure.Caption className='fs-5'>
        {name}
      </Figure.Caption>
      <Figure.Caption>
        {price.toLocaleString() + " VNĐ"}
      </Figure.Caption>
      <Figure.Caption>
        {desc}
      </Figure.Caption>
    </Figure>
    </div>
   </>
  )
}

export default DetailPage