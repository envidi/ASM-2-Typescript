
import {Routes,Route} from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import { api_url, getData,currentData,postMethod,api_signup, api_cate } from './ultilities'
import { useEffect ,useState} from 'react'
import {Product} from './types/product'
import { ProductPage,HomePage,DetailPage ,SignIn,SignUp} from './pages'
import { ListProduct,AddProduct,UpdateProduct } from './pages/Admin/Products'
import Spinner from 'react-bootstrap/Spinner';
import AdminLayout from './layouts/AdminLayout'
import ListCate from './pages/Admin/Categories/ListCate'
import AddCate from './pages/Admin/Categories/AddCate'
import UpdateCate from './pages/Admin/Categories/UpdateCate'
import { Cate } from './types/cate'


function App() {
  
  const [loadings, setLoading] = useState(true);
  const [productHome , setproductHome] = useState<Product[]>([])
  const [products , setProducts] = useState<Product[]>([])
  const [cates, setCates] = useState<Cate[]>([])
  const [isLogin,setIsLogin] = useState(false);
  const [user,setUser] = useState({})
  useEffect(()=>{
    const handleUrl = new URL(api_url)
    getData(handleUrl).then((data:Product[])=>{
      setProducts(data)
            
    })
  },[loadings])
  useEffect(()=>{
    const handleUrl = new URL(api_cate)
    getData(handleUrl).then((data:Cate[])=>{
      setCates(data)
            
    })
  },[loadings])
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
  const deleteProduct = ()=>{
    const handleUrl = new URL(api_url)
    getData(handleUrl).then((data:Product[])=>{
      setProducts(data)
            
    })
  }
  const handleUpdate = ()=>{
    const handleUrl = new URL(api_url)
    getData(handleUrl).then((data:Product[])=>{
      setProducts(data)
            
    })
  }
  const handleAddProduct = ()=>{
    const handleUrl = new URL(api_url)
    getData(handleUrl).then((data:Product[])=>{
      setProducts(data)
            
    })
  }
  const renderCateData = ()=>{
    const handleUrl = new URL(api_cate)
    getData(handleUrl).then((data:Product[])=>{
      setCates(data)
            
    })
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
        <Route path='product'>
          <Route index element={<ListProduct deleteProduct={deleteProduct} products={products} />}/>
          <Route path='add' element={<AddProduct handleAddProduct={handleAddProduct}  />}/>
          <Route path='edit/:id' element={<UpdateProduct handleUpdate={handleUpdate}  products={products} />}/>
        </Route>
        <Route path='category'>
          <Route index element={<ListCate renderCateData={renderCateData} cates={cates} />}/>
          <Route path='add' element={<AddCate handleAddProduct={handleAddProduct}  />}/>
          <Route path='edit/:id' element={<UpdateCate handleUpdate={handleUpdate}  products={products} />}/>
        </Route>
        
      </Route>
    </Routes>
     
    </>
  )
  }
  </>
   
  )
}

export default App
