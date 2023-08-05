import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../index.css'

function Header({isLogin,user,logOut}:{isLogin:boolean,user:any,logOut:any}) {
  const {username} = user?.user || 'Anonymous'
  return (
    <Navbar expand="lg" className="bg-blue my-1 rounded">
    <Container fluid>
      <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
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
              <NavDropdown.Item href="#action/3.3"> Admin</NavDropdown.Item>
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
        <Form className="d-flex">
      
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;