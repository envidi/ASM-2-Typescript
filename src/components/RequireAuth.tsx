import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { jsonParse } from '../ultilities'



function RequireAuth({children}:{children:any}) {
    const auth = useAuth()
    const userLocal = jsonParse(localStorage.getItem('user'))
    if(!auth.user && !userLocal){
        return <Navigate to='/signin'/>
    }
  return (
    children
  )
}

export default RequireAuth