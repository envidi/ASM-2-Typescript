import { Id } from "../types/product";


const api_url = 'http://localhost:3000/products';
const currentData = 'http://localhost:3000/products?_limit=4';
const api_signup = 'http://localhost:3000/users'
const api_signin = 'http://localhost:3000/signin'
const api_cate = 'http://localhost:3000/categories'
const api_user = 'http://localhost:3000/users'
const api_role = 'http://localhost:3000/roleID'


const fetchApi =async (api: URL)=>{
    try {
        
        const response = await fetch(api)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch')
    }
}
const getData =async (api:URL)=>{
   try {
    const data = await fetchApi(api)
    return data
   } catch (error) {
    console.log(error)
   }
}

const postMethod = (api:any,product:any,callback:any)=>{
    const options = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(product)
    }
    fetch(api,options)
    .then(callback)
   
 
}
const deleteMethod = (api:any,id:typeof Id,callback:any)=>{
    const options = {
        method : 'DELETE'   ,
          
    }
    fetch(api+'/'+id,options)
    .then(callback)
}
const putMethod = (api:any, product:any, id:typeof Id, callback:any)=>{
    const options = {
        method : 'PUT',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(product)
    }
    fetch(api+'/'+id,options)
    .then(callback)
   
}
const signMethod = (api:any,value:any,callback:any)=>{
    const options = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(value)
    }
    fetch(api,options)
    .then(res=>res.json())
    .then(callback)
}

export { fetchApi ,getData,api_url,currentData,api_signup,api_signin,postMethod,api_cate,deleteMethod,putMethod,api_user,api_role,signMethod}