import { Main,ControlledCarousel } from "../components";
import Product from '../types/product'
import React from 'react'


function HomePage({products }:{products : Product[]}) {
  console.log(products)
  return (
        <>
            <ControlledCarousel/>
            <Main/>
        </>


  )
}

export default HomePage