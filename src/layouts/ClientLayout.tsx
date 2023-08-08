import { Header,Footer } from "../components"
import {Outlet} from 'react-router-dom'
const ClientLayout = ({isLogin ,user,logOut,handleSearch}:{isLogin : boolean,user:object,logOut:any,handleSearch:Function})=>{

    return (
        <div className="container-fluid">
        <Header handleSearch={handleSearch} logOut={logOut} user={user} isLogin={isLogin}/>
        <Outlet/>
        <Footer/>
        </div>
    )

}
export default ClientLayout