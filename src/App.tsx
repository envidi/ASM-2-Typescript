
import {Routes,Route} from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import HomePage from './pages/HomePage'
import { api_url, getData } from './ultilities'
import { useEffect ,useState} from 'react'
import Product from './types/product'


function App() {
  

  const [products , setProducts] = useState<Product[]>([])
  useEffect(()=>{
    const handleUrl = new URL(api_url)
    getData(handleUrl).then((data:Product[])=>{
      setProducts(data)
            
    })
  },[])
  

  return (
    <>
    <Routes>
      <Route path='/' element={<ClientLayout/>}>
          <Route index element={<HomePage products={products} />}/>
      </Route>
    </Routes>
     
    </>
  )
}

export default App
