import { Link } from 'react-router-dom';
import { useAuthState } from '../../../context/authContext';

const Heros = () => {

    const authState = useAuthState()
    return (
        <div>
            <div className="d-none d-lg-block">
                {/* <div className="row g-0 mt-5">
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-left"></div>
                    </div>

                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">
                            <h1>What have you been reading?</h1>
                            <p className="lead">
                                The library team would love to know what you have been reading.
                            </p>

                        </div>
                    </div>
                </div> */}
                <div className="row g-0">
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">
                            <h1>Our catalog is always being renewed!</h1>
                            <p className="lead">
                                Visit our site frequently to see what's new..
                            </p>
                            {authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-lg text-white' to='/search'>Explore top mangas</Link>
                            :
                                
                                <Link to='/login' className="btn main-color btn-lg text-white">Sign In</Link>
                            }
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        {/* <div className="col-image-right"></div> */}
                        <img src={require('../../../Images/PublicImages/P3271143.JPG')}
                                height='350'
                                alt='manga'
                            />
                    </div>
                </div>
            </div>

            {/* Mobile heros */}
            <div className="d-lg-none">
                <div className="container">
                    {/* <div className="m-2">
                        <div className="col-image-left"></div>
                        <div className="mt-2">
                            <h1>Out collection is always changing!</h1>
                            <p className="lead">
                                Try to check in daily as out collection is always changing!
                            </p>

                        </div>
                    </div> */}
                    <div className="mt-2">
                        <div className="col-image-right"></div>
                        <div className="mt-2">
                            <h1>Out collection is always changing!</h1>
                            <p className="lead">
                                Try to check in daily as out collection is always changing!
                            </p>
                            {authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-lg text-white' to='/search'>Explore top mangas</Link>
                            :
                                
                                <Link to='/login' className="btn main-color btn-lg text-white">Sign In</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Heros;
