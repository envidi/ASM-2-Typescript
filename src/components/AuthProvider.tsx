
import {createContext,useState,useContext} from 'react'

const AuthContext = createContext({
    user : undefined,
    login : (_user:any)=>{},
    logout : ()=>{},
   
})


function AuthProvider({children}:{children :any}) {
    const [user,setUser] = useState(undefined)
    
    const login = (user:any)=>{
        setUser(user)
    }
    const logout = ()=>{
        setUser(undefined)
    }
    const contextValue = {
        user,
        login,
        logout,
    
      };
  return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )
}
export const useAuth = ()=>{
    return useContext(AuthContext)
}

export default AuthProvider