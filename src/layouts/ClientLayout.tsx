import { Header,Footer } from "../components"
import {Outlet} from 'react-router-dom'
const ClientLayout = ({isLogin ,user,logOut}:{isLogin : boolean,user:object,logOut:any})=>{

    return (
        <div className="container-fluid">
        <Header logOut={logOut} user={user} isLogin={isLogin}/>
        <Outlet/>
        <Footer/>
        </div>
    )

}
export default ClientLayout