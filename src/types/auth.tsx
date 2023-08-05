interface SignInType {
    email : string;
    password : string
}
interface SignUpType {
    username : string;
    email : string;
    password : string;
    confirmPassword : string
}
export type { SignInType,SignUpType}