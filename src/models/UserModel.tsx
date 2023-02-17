class UserModel{

    email: string
    token: string
    isAuthenticated: boolean
    role: string
    constructor(email: string, token: string, isAuthenticated: boolean, role: string){
        this.email = email
        this.token = token
        this.isAuthenticated = isAuthenticated
        this.role = role
    }
}

export default UserModel