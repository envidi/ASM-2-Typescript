import { Product } from "../../types/product"
import Card from 'react-bootstrap/Card';
import '../../admin.css'
import { Cate } from "../../types/cate";
import { User } from "../../types/user";
function Dashboard({products,cates,users}:{products:Product[],cates: Cate,users: User[]}) {

  
  return (
    <div className="d-flex gap-3 p-3 flex-row flex-wrap">
   <Card className="col-lg-4 col-md-4 product-dashboard ">
      <Card.Body>
        <Card.Title><i className="fa-solid fa-mug-saucer"></i> Product</Card.Title>
        
        <Card.Text>
         Total of product : {products.length || 'undefined'}
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className="col-lg-3 col-md-4 product-dashboard ">
      <Card.Body>
        <Card.Title><i className="fa-solid fa-bars"></i> Category</Card.Title>
        
        <Card.Text>
         Total of product : {cates.length || 'undefined'}
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className="col-lg-4 col-md-4 product-dashboard ">
      <Card.Body>
        <Card.Title><i className="fa-solid fa-user"></i> Product</Card.Title>
        
        <Card.Text>
         Total of product : {users.length || 'undefined'}
        </Card.Text>
      </Card.Body>
    </Card>
    
    </div>
  )
}

export default Dashboard