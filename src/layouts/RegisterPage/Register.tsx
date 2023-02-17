import { useState } from "react";
import UserRegisterRequestModel from "../../models/UserRegisterRequestModel";
import { Redirect } from "react-router-dom";
import UserLoginRequestModel from "../../models/UserLoginRequestModel";
import { useAuthDispatch, useAuthState } from "../../context/authContext";
import SpinnerLoadingMini from "../Utils/SpinnerLoadingMini";

const Register = () => {

    const authState = useAuthState()
    const authDispatch = useAuthDispatch()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<any>({})
    const [success, setSuccess] = useState<boolean>(false)



    const register = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const userRegisterRequest: UserRegisterRequestModel = new UserRegisterRequestModel(name, email, password)
        const reqOpts = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(userRegisterRequest)
        }
        const response = await fetch(`http://localhost:8080/api/users`, reqOpts)
        const JSONres = await response.json()
        if(response.status === 400){
            setErrors(JSONres.errors)
        } else {

            setErrors('')
            setName('')
            setEmail('')
            setPassword('')
            setSuccess(true)

            setTimeout(() => {
                setSuccess(false)
                login(userRegisterRequest.email, userRegisterRequest.password)
            }, 2000);
        }

    }

    const login = async (email: string, password: string) => {
        const userLoginRequest: UserLoginRequestModel = new UserLoginRequestModel(email, password)
        const reqOpts = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(userLoginRequest)
        }
        const response = await fetch(`http://localhost:8080/api/users/login`, reqOpts)
        const JSONres = await response.json()
        
        if(JSONres.token){
            setErrors('')
            authDispatch({
                type: 'login',
                token: JSONres.token
            })
        }
    }

    if(authState.isAuthenticated){
        return <Redirect to='/'/>
    }

    
    return ( 
        <div className="container mb-5">
            <div className="row mt-5">
   
                <div className="col-sm-6  mx-auto ">

                    <div className="card">
                        <h5 className="card-header">Register</h5>
                        <div className="card-body">
                            <form >
                            {success && 
                                <>
                                    <div className="alert alert-success" role="alert" >
                                        Account created successfully
                                    </div>
                                        <SpinnerLoadingMini/>
                                    
                                </>
                                
                            }
                                <div className="mb-3">
                                    <label className="form-label">
                                        Name
                                    </label>
                                    <input type="text" className="form-control" placeholder="Name" onChange={e => setName(e.target.value)} value={name}/>
                                </div>
                                {errors.name &&<div className="mt-3 alert alert-danger" role="alert" >{errors.name}</div>}
                                
                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>
                                    <input type="email" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}/>
                                </div>
                                {errors.email && <div className="mt-3 alert alert-danger" role="alert" >{errors.email}</div>}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
                                </div>
                                {errors.password && <div className="mt-3 alert alert-danger" role="alert" >{errors.password}</div>}
                                <div>
                                    <button type="submit" className="btn btn-custom mt-3" onClick={register}>
                                        Create Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Register;