import { Link } from 'react-router-dom';
import { useAuthState } from '../../../context/authContext';


const LibraryServices = () => {
    const authState = useAuthState()

    return (  
        <div className="container my-5">
            <div className="row p-4 align-items-center border shadow-lg">
                <div className="col-lg-7 p-3">
                    <h1 className="display-6 fw-bold">
                        Do not you find what you are looking for?
                    </h1>
                    <p className="lead">
                        If you can't find what you're looking for, send a personal message to our administrators!
                    </p>
                    <div className="d-grip gap-2 justify-content-md-start mb-4 mb-lg-3">
                        {authState?.isAuthenticated ?
                            <Link type='button' className='btn main-color btn-lg px-4 me-md-2 fw-bold text-white' to='/messages'>Services</Link>
                        :
                            
                            <Link to='/login' className="btn main-color btn-lg text-white">Sign In</Link>
                        }
                    </div>
                </div>
                {/* <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div> */}
                <img className="col-lg-4 offset-lg-1 shadow-lg"
                                                    src={require('./../../../Images/PublicImages/calligraphy-gda61a49ed_1920.jpg')}
                                                    
                                                    height='250'
                                                    alt=''
                                                />
            </div>
        </div>
    );
}
 
export default LibraryServices;