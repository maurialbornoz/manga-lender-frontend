import {useState, useEffect} from 'react'
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import LoansModal from "./LoansModal";
import { useAuthState } from '../../../context/authContext';
const Loans = () => {

    const authState = useAuthState()

    const [httpError, setHttpError] = useState(null)
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<Array<ShelfCurrentLoans>>([])
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true)

    const [checkout, setCheckout] = useState(false)

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8080/api/mangas/secure/currentloans`
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        // Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        Authorization: `Bearer ${authState.token}`,
                        'Content-Type' : 'application/json'
                    }


                }
                const shelfCurrentLoansRes = await fetch(url, requestOptions)
                if(!shelfCurrentLoansRes.ok){
                    throw new Error('Something went wrong')
                }
                const shelfCurrentLoansResJSON = await shelfCurrentLoansRes.json()

                setShelfCurrentLoans(shelfCurrentLoansResJSON)
            }
            setIsLoadingUserLoans(false)
        }
        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false)
            setHttpError(error.message)
        })
        window.scroll(0, 0)

    }, [authState, checkout])

    if(isLoadingUserLoans){
        return <SpinnerLoading/>
    }

    if(httpError){
        return(
            <div className="contaner">
                <p>
                    {httpError}
                </p>
            </div>
        )
    }

    const returnManga = async (mangaId:number) => {
        const url = `http://localhost:8080/api/mangas/secure/return?mangaId=${mangaId}`
        const reqOpts = {
            method: 'PUT',
            headers: {
                // Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                Authorization: `Bearer ${authState.token}`,
                'Content-Type' : 'application/json'
            }

            
        }
        const returnRes = await fetch(url, reqOpts)
        if(!returnRes.ok){
            throw new Error("Something went wrong");
            
        }
        setCheckout(!checkout)
    }

    const renewLoan = async (mangaId:number) => {
        const url = `http://localhost:8080/api/mangas/secure/renew/loan?mangaId=${mangaId}`
        const reqOpts = {
            method: 'PUT',
            headers: {
                // Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                Authorization: `Bearer ${authState.token}`,
                'Content-Type' : 'application/json'
            }
        }
        const returnRes = await fetch(url, reqOpts)
        if(!returnRes.ok){
            throw new Error("Something went wrong");
        }
        setCheckout(!checkout)
    }

    return ( 
        <div>
            {/* Desktop */}
            <div className="d-none d-lg-block mt-2">
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5>Current Loans</h5>
                        {shelfCurrentLoans.map((shelfCurrentLoan) => (
                            <div key={shelfCurrentLoan.manga.id}>
                                <div className="row mt-3 mb-3">
                                    <div className="col-4 col-md-4 container">
                                        {shelfCurrentLoan.manga?.img ? 
                                            <img src={shelfCurrentLoan.manga.img} width='226' height='349' alt='Manga' />
                                            :
                                            <img src={require('./../../../Images/MangasImages/default_image.jpg')} 
                                                width='226' height='349' alt='Manga'
                                            />
                                        }
                                    </div>
                                    <div className="card col-3 col-md-3 container d-flex">
                                        <div className="card-body">
                                            <div className="mt-3">
                                                <h4>Loans Options</h4>
                                                {shelfCurrentLoan.daysLeft > 0 && 
                                                    <p className="text-secondary">
                                                        Due in {shelfCurrentLoan.daysLeft} days.
                                                    </p>
                                                }
                                                {shelfCurrentLoan.daysLeft === 0 && 
                                                    <p className="text-success">
                                                        Due Today.
                                                    </p>
                                                }
                                                {shelfCurrentLoan.daysLeft < 0 &&
                                                    <p className="text-danger">
                                                        Past due by {shelfCurrentLoan.daysLeft} days.
                                                    </p>
                                                }
                                                <div className="list-group mt-3">
                                                    <button className="list-group-item list-group-item-action" aria-current='true' data-bs-toggle='modal' data-bs-target={`#modal${shelfCurrentLoan.manga.id}`}>
                                                        Manage Loan

                                                    </button>
                                                    <Link to={'search'} className="list-group-item list-group-item-action">Search more Mangas?</Link>
                                                </div>

                                            </div>
                                            <hr />
                                            <p className="mt-3">
                                                Help other find their adventure by reviewing your loan.
                                            </p>
                                            <Link className="btn btn-primary" to={`/checkout/${shelfCurrentLoan.manga.id}`}>Leave a Review</Link>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={false} returnManga={returnManga} renewLoan={renewLoan} />

                            </div>
                        ))}
                    </>
                :
                    <>
                        <h3 className="mt-3">
                            Currently no loans.
                        </h3>
                        <Link className="btn btn-link" to={`search`}>Search for a new manga</Link>
                    </>
                }
            </div>

            {/* Mobile */}
            <div className="container d-lg-none mt-2">
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5 className="mb-3">Current Loans: </h5>
                        {shelfCurrentLoans.map((shelfCurrentLoan) => (
                            <div key={shelfCurrentLoan.manga.id}>
                                
                                    <div className="d-flex justify-content-center align-items-center">
                                        {shelfCurrentLoan.manga?.img ? 
                                            <img src={shelfCurrentLoan.manga.img} width='226' height='349' alt='Manga' />
                                            :
                                            <img src={require('./../../../Images/MangasImages/default_image.jpg')} 
                                                width='226' height='349' alt='Manga'
                                            />
                                        }
                                    </div>
                                    <div className="card d-flex mt-5 mb-3">
                                        <div className="card-body container">
                                            <div className="mt-3">
                                                <h4>Loans Options</h4>

                                                <div className="list-group mt-3">
                                                    <button className="list-group-item list-group-item-action" aria-current='true' data-bs-toggle='modal' data-bs-target={`#mobilemodal${shelfCurrentLoan.manga.id}`}>
                                                        Manage Loan

                                                    </button>
                                                    <Link to={'search'} className="list-group-item list-group-item-action">Search more Mangas?</Link>
                                                </div>

                                            </div>
                                            <hr />
                                            <p className="mt-3">
                                                Help other find their adventure by reviewing your loan.
                                            </p>
                                            <Link className="btn btn-primary" to={`/checkout/${shelfCurrentLoan.manga.id}`}>
                                                Leave a Review
                                            </Link>
                                        </div>
                                    </div>
                                
                                <hr />
                                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={true} returnManga={returnManga} renewLoan={renewLoan}   />

                            </div>
                        ))}
                    </>
                :
                    <>
                        <h3 className="mt-3">
                            Currently no loans.
                        </h3>
                        <Link className="btn btn-link" to={`search`}>Search for a new manga</Link>
                    </>
                }
            </div>
        </div>
    );
}
 
export default Loans;
