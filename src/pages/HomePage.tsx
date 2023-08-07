import { Main,ControlledCarousel } from "../components";
import {Product} from '../types/product'


function HomePage({productHome }:{productHome : Product[]}) {
 
  return (       
        <>
            <ControlledCarousel/>
            <Main products={productHome}/>
        </>  

  )
}

export default HomePage