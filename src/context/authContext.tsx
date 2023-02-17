import { Dispatch, FC, ReactNode, createContext, useContext, useReducer } from "react";
import UserModel from "../models/UserModel";
import { AuthReducer, authInitialState } from "../state/reducers/authReducer";
import { AuthActions } from "../state/actions/authActions";

export const AuthStateContext = createContext<UserModel>(authInitialState)
export const AuthDispatchContext = createContext<Dispatch<AuthActions>>(() => undefined)

interface AuthProviderProps {
    children: ReactNode
}
export const AuthProvider:FC<AuthProviderProps> = ({children}) => {
    const [user, dispatch] = useReducer(AuthReducer, authInitialState)

    return(
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

export const useAuthState = ( ) => {
    const context = useContext(AuthStateContext)
    if(context === undefined) {
        throw new Error("useAuthState must be used within an AuthProvider")
    }

    return context
}

export const useAuthDispatch = ( ) => {
    const context = useContext(AuthDispatchContext)
    if(context === undefined) {
        throw new Error("useAuthDispatch must be used within an AuthProvider")
    }

    return context
}

