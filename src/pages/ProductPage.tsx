import { Main } from '../components'
import {Product} from '../types/product'
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function ProductPage({products }:{products : Product[]}) {
  return (
   <>
   <Breadcrumb>
      <Breadcrumb.Item href='/' >Home</Breadcrumb.Item>
      <Breadcrumb.Item active >
        Product
      </Breadcrumb.Item>
    </Breadcrumb>
    <Main products={products}/>
   </>
  )
}

export default ProductPage