interface User {
    id ?: number | string | undefined,
    email : string,
    username : string,
    password : string,
    role ?: number,

}
interface Role {
    id ?: number | string | undefined,
    name ?: string
}
export type {User,Role}