interface Product {
    json(): any
    id ?: string | number,
    name : string,
    price : {
        number : number
    },
    description : string,
    image : string,
    category_id : number,
    accessToken : string
}

let Id: string | number | undefined
export type{ Product,Id}