import { Header,Footer } from "../components"
import {Outlet} from 'react-router-dom'
const ClientLayout = ()=>{

    return (
        <div className="container-fluid">
        <Header/>
        <Outlet/>
        <Footer/>
        </div>
    )

}
export default ClientLayout