import UserModel from "../../models/UserModel";
import { authenticate, logout } from "../../utils/auth";
import { AuthActions } from "../actions/authActions";
import produce from "immer";

export const authInitialState: UserModel = authenticate()

export const AuthReducer = produce((state: UserModel, action: AuthActions): UserModel => {
    switch(action.type){
        case 'login':
            state = authenticate(action.token)
            return state
        case 'logout':
            state = logout()
            return state
        default:
            return state
    }
})