import { Link, NavLink } from "react-router-dom"
import SpinnerLoading from "../Utils/SpinnerLoading"
import { useAuthDispatch, useAuthState } from "../../context/authContext"


const Navbar = () => {
  const authState = useAuthState()
  const authDispatch = useAuthDispatch()
  if(!authState) {
    return <SpinnerLoading/>
  }

  const handleLogout =async () => {
    authDispatch({
      type: 'logout'
    })
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">

        {/* <span className="navbar-brand">MangaLender</span> */}
        <NavLink className="navbar-brand" to='/'>MangaLender</NavLink>
        <button 
          className="navbar-toggler" 
          type='button' 
          data-bs-toggle='collapse' 
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'  
          aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <NavLink className="nav-link" to='/'>Home</NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to='/search'>Search</NavLink>
            </li>
            {authState.isAuthenticated && 
              <li className="nav-item">
                <NavLink className='nav-link' to='/shelf'>Reserve</NavLink>
              </li>
            }
            {/* {authState.isAuthenticated && authState.accessToken?.claims?.userType === 'admin' && */}
            {authState.isAuthenticated && authState.role === 'ADMIN' &&
              <li className="nav-item">
                <NavLink className='nav-link' to='/admin'>Administration</NavLink>
              </li>
            }
          </ul>

          <ul className="navbar-nav ms-auto">
            {!authState.isAuthenticated ? 
              <>
                <li className="nav-item m-1">
                  <Link to='/login' className="btn btn-outline-light" type='button'>Sing In</Link>
                </li>
                <li className="nav-item m-1">
                  <Link to='/register' className="btn btn-outline-light" type='button'>Register</Link>
                </li>
              </>
            :
              <li>
                <button className="btn btn-outline-light" onClick={handleLogout}>Log Out</button>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
