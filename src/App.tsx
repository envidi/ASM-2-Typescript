
import {Routes,Route} from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import { api_url, getData,currentData,postMethod,api_signup } from './ultilities'
import { useEffect ,useState} from 'react'
import Product from './types/product'
import { ProductPage,HomePage,DetailPage ,SignIn,SignUp} from './pages'
import Spinner from 'react-bootstrap/Spinner';
import AdminLayout from './layouts/AdminLayout'


function App() {
  
  const [loadings, setLoading] = useState(true);
  const [productHome , setproductHome] = useState<Product[]>([])
  const [products , setProducts] = useState<Product[]>([])
  const [isLogin,setIsLogin] = useState(false);
  const [user,setUser] = useState({})
  useEffect(()=>{
    const handleUrl = new URL(api_url)
    getData(handleUrl).then((data:Product[])=>{
      setProducts(data)
            
    })
  },[])
  useEffect(()=>{
    const handleUrl = new URL(currentData)
    getData(handleUrl).then((data:Product[])=>{
      setproductHome(data)
            
    })
  },[])
  
  useEffect(()=>{
    if(productHome && productHome.length !== 0){
      setLoading(false)
    }
  },[productHome])

  const handleAdd = (product:Product)=>{
    postMethod(api_signup,product,( data:Product )=>{
      console.log(data)
    })
  }
  const handleSignIn = (data:any)=>{
    if(data){
      setUser(data)
      setIsLogin(true)
    }
  }

  const logOut = ()=>{
    setIsLogin(false)
  }

  

  return (
    <>
    { loadings ? ( <div className="bg-loading">  <Spinner animation="border" variant="primary" /> </div>) : (
      <>
    <Routes>
      <Route path='/' element={<ClientLayout logOut={logOut} user={user} isLogin={isLogin}/>}>
          <Route index element={<HomePage productHome={productHome} />}/>
          <Route path='product' element={<ProductPage products={products} />}/>
          <Route path='product/:id' element={<DetailPage products={products} />}/>
          <Route path='signin' element={<SignIn isLogin={isLogin} handleSignIn={handleSignIn}  />}/>
          <Route path='signup' element={<SignUp handleAdd={handleAdd} />}/>
      </Route>
      <Route path='/admin' element={<AdminLayout/>}>

      </Route>
    </Routes>
     
    </>
  )
  }
  </>
   
  )
}

export default App
