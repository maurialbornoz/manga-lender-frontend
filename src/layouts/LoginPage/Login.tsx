import { useState } from "react";
import UserLoginRequestModel from "../../models/UserLoginRequestModel";
import { useAuthDispatch, useAuthState } from "../../context/authContext";
import { Redirect } from "react-router-dom";

const Login = () => {

    const authState = useAuthState()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
    const [success, setSuccess] = useState<boolean>(false)

    const authDispatch = useAuthDispatch()

    if(authState.isAuthenticated){
        return <Redirect to="/"/>
    }

    const login = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if(email !== '' && password !== ''){
            
            const userLoginRequest: UserLoginRequestModel = new UserLoginRequestModel(email, password)
            const reqOpts = {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(userLoginRequest)
            }
            const response = await fetch(`http://localhost:8080/api/users/login`, reqOpts)


            if (response.status === 401) {
                setErrors("Invalid credentials")
            }

            const JSONres = await response.json()
            
            if(JSONres.token){
                setErrors('')
                authDispatch({
                    type: 'login',
                    token: JSONres.token
                })
            }
            setEmail('')
            setPassword('')
        } else {
            setErrors("All fields must be filled out")
        }

            
            // setErrors({})
            // setDisplayWarning(false)
            // setDisplaySuccess(true)
            
        
    
    }
    
    return ( 
        <div className="container ">
            <div className="row mt-5">
   
                <div className="col-sm-6  mx-auto ">

                    <div className="card">
                        <h5 className="card-header">Login</h5>
                        <div className="card-body">
                            <form >

                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>
                                    <input type="email" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-custom mt-2" onClick={login}>
                                        Login
                                    </button>
                                </div>
                            </form>
                            {errors && <div className="mt-3 alert alert-danger" role="alert" >{errors}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Login;