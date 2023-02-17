import UserModel from "../models/UserModel";
import jwt_decode from "jwt-decode"

const TOKEN_KEY = "token"
const defaultUser: UserModel = {
    email: "",
    isAuthenticated: false,
    token: "",
    role: ""
}

const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY) || null
}

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const authenticate = (token? : string):UserModel => {
    if(token?.startsWith("Bearer ")){
        token = token.replace("Bearer ", "")
    }
    if(token) {
        setToken(token)
    }


    const _token = token ? token : getToken()



    if(!_token) {
        return { ...defaultUser }
    }

    const decoded: any = jwt_decode(_token)

    const currentTime = Date.now() / 1000

    if(decoded.exp < currentTime) {
        removeToken()
        return {...defaultUser}
    }

    return {...defaultUser, email: decoded.sub, isAuthenticated: true, token: _token, role: decoded.roles[0]}
}

export const logout = (): UserModel => {
    removeToken()
    return { ...defaultUser }
}