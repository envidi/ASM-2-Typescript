import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import '../index.css'
import { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({isLogin,user,logOut,handleSearch}:{isLogin:boolean,user:any,logOut:any,handleSearch:Function}) {
  const inputRef = useRef<HTMLInputElement | null>(null); ;

  const navigate = useNavigate();
  const {username,role = 3} = user?.user || 'Anonymous'
  const [search,setSearch] = useState<string>('')

  const handleChange = (e:any)=>{
    const target = e.target
    const value = target.value
    setSearch(value)
    handleSearch(value)
    
  }
    const handleSubmit = (e:any)=>{
      e.preventDefault()
      handleSearch(search)
      setSearch('')
      if (inputRef.current) {
        inputRef.current.focus();
      }
      navigate('/product')
      
      
    }
  
  
  return (
    <Navbar expand="lg" className="bg-blue my-1 rounded">
    <Container fluid>
      <Navbar.Brand href="#"> <Image src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1691390839/logo-shop-laptop_tqmezj.png" width={50} rounded /></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0 " 
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Link className='d-flex align-items-center mb-lg-0 mb-sm-1' style={{textDecoration:'none'}} to={'/'}>Home</Link>
          <Link className='d-flex align-items-center mx-lg-3 mx-sm-0 ' style={{textDecoration:'none'}} to={'/product'}>Product</Link>
          <Nav.Link href="#action1" className='text-primary'>About</Nav.Link>
          <Nav.Link href="#action1" className='text-primary'>Contact</Nav.Link>

          {
            isLogin ? (
              <NavDropdown title={username} id="basic-nav-dropdown" >
              <NavDropdown.Item href="#action/3.1">Thông tin tài khoản</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
               Đơn hàng
              </NavDropdown.Item>
              {
                role === 1 ? (
                  <NavDropdown.Item href="#action/3.3"><Link to={`admin/product`}>Admin</Link></NavDropdown.Item>
                ) : (  <></>  )
              }
         
              <NavDropdown.Divider />
              <NavDropdown.Item  onClick={logOut}>
                Đăng xuất
              </NavDropdown.Item>
            </NavDropdown>

            ) : (
              <div className='d-flex flex-lg-row gap-2 align-items-lg-center flex-sm-column align-items-sm-start'>
                <Button variant="primary" className='btn-sm'><Link style={{color : 'white',textDecoration:'none'}} to={`/signin`}>Sign in</Link></Button>
                <Button variant="outline-primary" className='btn-sm'><Link style={{textDecoration:'none'}} to={`/signup`}>Sign up</Link></Button>
             </div>
            )
          }
        
         
          
          
         
        
        </Nav>
        <Form className="d-flex" onSubmit={handleSubmit}>
      
          <Form.Control
            ref={inputRef}
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={handleChange}
          />
          <Button type='submit' variant="outline-primary">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;