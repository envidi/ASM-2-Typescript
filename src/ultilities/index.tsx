

const api_url = 'http://localhost:3000/products';

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
export { fetchApi ,getData,api_url}