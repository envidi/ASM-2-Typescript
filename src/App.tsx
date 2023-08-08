
import {Routes,Route} from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import { api_url, getData,currentData, api_cate, api_user } from './ultilities'
import { useEffect ,useState} from 'react'
import {Product} from './types/product'
import { ProductPage,HomePage,DetailPage ,SignIn,SignUp} from './pages'
import { ListProduct,AddProduct,UpdateProduct } from './pages/Admin/Products'
import Spinner from 'react-bootstrap/Spinner';
import AdminLayout from './layouts/AdminLayout'
import { Cate } from './types/cate'
import { User } from './types/user'
import {ListUser,AddUser,UpdateUser} from './pages/Admin/Users'
import {ListCate,AddCate,UpdateCate} from './pages/Admin/Categories'


function App() {
  const [defaultProduct,setDefaultProduct] =  useState<Product[]>([])
  
  const [loadings, setLoading] = useState(true);
  const [productHome , setproductHome] = useState<Product[]>([])
  const [products , setProducts] = useState<Product[]>([])
  const [cates, setCates] = useState<Cate[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLogin,setIsLogin] = useState(false);
  const [user,setUser] = useState({})
  useEffect(()=>{
    const handleUrl = new URL(api_url)
    getData(handleUrl).then((data:Product[])=>{
      setProducts(data)
            
    })
    const handleUrl1 = new URL(api_url)
    getData(handleUrl1).then((data:Product[])=>{
      setDefaultProduct(data)
            
    })
  },[loadings])
  
  useEffect(()=>{
    const handleUrl = new URL(api_cate)
    getData(handleUrl).then((data:Cate[])=>{
      setCates(data)
            
    })
  },[loadings])
  useEffect(()=>{
    const handleUrl = new URL(api_user)
    getData(handleUrl).then((data:User[])=>{
      setUsers(data)
            
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

 
  const handleSignIn = (data:any)=>{
    if(data){
      setUser(data)
      setIsLogin(true)
    
    }
  }
  const handleSearch = (value:string)=>{
    const search = defaultProduct.filter((product)=>{
      return product.name.toLowerCase().split(' ').join('').includes(value.toLowerCase().split(' ').join(''));
    })  
    setProducts(search)
  }

  const logOut = ()=>{
    setIsLogin(false)
  } 
  
  const renderProductData = ()=>{
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
  const renderUserData = ()=>{
    const handleUrl = new URL(api_user)
    getData(handleUrl).then((data:User[])=>{
      setUsers(data)
            
    })
  }

  

  return (
    <>
    { loadings ? ( <div className="bg-loading">  <Spinner animation="border" variant="primary" /> </div>) : (
      <>
    <Routes>
      <Route path='/' element={<ClientLayout handleSearch={handleSearch} logOut={logOut} user={user} isLogin={isLogin}/>}>
          <Route index element={<HomePage productHome={productHome} />}/>
          <Route path='product' element={<ProductPage products={products} />}/>
          <Route path='product/:id' element={<DetailPage products={products} />}/>
          <Route path='signin' element={<SignIn isLogin={isLogin} handleSignIn={handleSignIn}  />}/>
          <Route path='signup' element={<SignUp  />}/>
          
      </Route>
      <Route path='/admin' element={<AdminLayout/>}>
        <Route path='product'>
          <Route index element={<ListProduct renderProductData={renderProductData} products={products} />}/>
          <Route path='add' element={<AddProduct renderProductData={renderProductData}  />}/>
          <Route path='edit/:id' element={<UpdateProduct renderProductData={renderProductData}  products={products} />}/>
        </Route>
        <Route path='category'>
          <Route index element={<ListCate renderCateData={renderCateData} cates={cates} />}/>
          <Route path='add' element={<AddCate renderCateData={renderCateData}  />}/>
          <Route path='edit/:id' element={<UpdateCate renderCateData={renderCateData}  cates={cates} />}/>
        </Route>
        <Route path='user'>
          <Route index element={<ListUser renderUserData={renderUserData} users={users} />}/>
          <Route path='add' element={<AddUser renderUserData={renderUserData}  />}/>
          <Route path='edit/:id' element={<UpdateUser renderUserData={renderUserData}  users={users} />}/>
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
