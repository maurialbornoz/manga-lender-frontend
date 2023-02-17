import { useEffect, useState } from "react";
import MangaModel from "../../models/MangaModel";
import SpinnerLoading from "../Utils/SpinnerLoading";
import StarReviews from "../Utils/StarReviews";
import CheckoutAndReviewBox from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import LatestReviews from "./LatestReviews";
import ReviewRequestModel from "../../models/ReviewRequestModel";
import { useAuthState } from "../../context/authContext";

const MangaCheckoutPage = () => {
    const authState = useAuthState()

    const [manga, setManga] = useState<MangaModel>()
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    // Review state
    const [reviews, setReviews] = useState<Array<ReviewModel>>([])
    const [totalStars, setTotalStars] = useState<number>(0)
    const [isLoadingReview, setIsLoadingReview] = useState(true)

    const [isReviewLeft, setIsReviewLeft] = useState(false)
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true)

    // Loans count state
    const [currentLoansCount, setCurrentLoansCount] = useState(0)
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true)

    // is manga check out?
    const [isCheckedOut, setIsCheckedOut] = useState(false)
    const [isLoadingCheckedOut, setIsLoadingCheckedOut] = useState(true)

    const mangaId = (window.location.pathname).split('/')[2]

    useEffect(() => {
        const fetchManga =async () => {
            const baseUrl: string = `http://localhost:8080/api/mangas/${mangaId}`
            const response = await fetch(baseUrl)

            if(!response.ok){
                throw new Error('Something went wrong')
            }

            const responseData = await response.json()
            // const responseData = JSONres._embedded.manga
            setManga(responseData)
            setIsLoading(false)

        }
        fetchManga().catch((error: any) => {
            setIsLoading(false)
            setHttpError(error.message)
        }) 
    }, [isCheckedOut])

    useEffect(() => {
        const fetchMangaReviews =async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByMangaId?mangaId=${mangaId}`
            const responseReviews = await fetch(reviewUrl)

            if(!responseReviews.ok){
                throw new Error('Something went wrong')
            }

            const JSONres = await responseReviews.json()
            
            const responseData = JSONres._embedded.reviews

            let weigthStarReviews: number = 0
            responseData.map((res: ReviewModel) => weigthStarReviews = weigthStarReviews + res.rating)
            const round = parseFloat((Math.round((weigthStarReviews / responseData.length) * 2) / 2).toFixed(1))

            setTotalStars(round)
            setReviews(responseData)
            setIsLoadingReview(false)
        }
        fetchMangaReviews().catch((error: any) => {
            setIsLoadingReview(false)
            setHttpError(error.message)
        })
    }, [isReviewLeft])

    useEffect(() => {
        const fetchUserReviewManga =async () => {
            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8080/api/reviews/secure/user/manga?mangaId=${mangaId}`
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        // Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        Authorization: `Bearer ${authState.token}`,
                        'Content-Type': 'application/json'
                    }
                }
                const userReview = await fetch(url, requestOptions)
                if(!userReview.ok){
                    throw new Error('Something went wrong')
                }
                const userReviewResJSON = await userReview.json()
                setIsReviewLeft(userReviewResJSON)
            }
            setIsLoadingUserReview(false)
        }
        fetchUserReviewManga().catch((error: any) => {
            setIsLoadingUserReview(false)
            setHttpError(error.message)
        })

    }, [authState])

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if(authState && authState.isAuthenticated){
                const url = "http://localhost:8080/api/mangas/secure/currentloans/count"
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        // Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        Authorization: `Bearer ${authState.token}`,
                        'Content-Type': 'application/json'
                    }
                }
                const currentLoansCountResponse = await fetch(url, requestOptions)
                if(!currentLoansCountResponse.ok){
                    throw new Error("Something went wrong")
                }
                const currentLoansCountResJSON = await currentLoansCountResponse.json()
                setCurrentLoansCount(currentLoansCountResJSON)
            }
            setIsLoadingCurrentLoansCount(false)
        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false)
            setHttpError(error.message)
        })
    }, [authState])

    useEffect(() => {
        const fetchUserCheckedOutManga = async () => {
            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8080/api/mangas/secure/ischeckout/byuser?mangaId=${mangaId}`
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        // Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        Authorization: `Bearer ${authState.token}`,
                        'Content-Type': 'application/json'
                    }
                }
                const mangaCheckedOut = await fetch(url, requestOptions)
                if(!mangaCheckedOut.ok){
                    throw new Error('Something went wrong')
                }

                const mangaCheckedOutResJSON = await mangaCheckedOut.json()
                setIsCheckedOut(mangaCheckedOutResJSON)
            }    
            setIsLoadingCheckedOut(false)
        }
        fetchUserCheckedOutManga().catch((error: any) => {
            setIsLoadingCheckedOut(false)
            setHttpError(error.message)
        })
    }, [authState])

    if(isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingCheckedOut || isLoadingUserReview){
        return (
            <div className="container m-5">
                <SpinnerLoading/>
            </div>
        )
    }

    if(httpError) {
        <div className="container m-5">
            <p>{httpError}</p>
        </div>
    }

    const checkoutManga = async () => {
        const url = `http://localhost:8080/api/mangas/secure/checkout?mangaId=${mangaId}`
        const requestOptions = {
            method: 'PUT',
            headers: {
                // Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                Authorization: `Bearer ${authState.token}`,
                'Content-Type' : 'application/json'
            }
        }
        const checkoutRes = await fetch(url, requestOptions)
        if(!checkoutRes.ok){
            throw new Error('Something went wrong')
        }
        setIsCheckedOut(true)
    }


    const submitReview = async (starInput: number, reviewDescription: string) => {
        let mangaId : number = 0
        if(manga?.id){
            mangaId = manga.id
        }

        const reviewRequestModel = new ReviewRequestModel(starInput, mangaId, reviewDescription)
        const url = 'http://localhost:8080/api/reviews/secure'
        const requestOptions = {
            method: 'POST',
            headers: {
                // Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                Authorization: `Bearer ${authState.token}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        }

        const returnRes = await fetch(url, requestOptions)
        if(!returnRes.ok){
            throw new Error('Something went wrong')
        }
        setIsReviewLeft(true)

    }

    return ( 
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {manga?.img ? 
                            <img src={manga?.img} alt="manga" 
                                width='226'
                                height='349'
                            />
                        :
                            <img src={require('../../Images/MangasImages/default_image.jpg')} alt="manga" 
                                width='226'
                                height='349'
                            /> 
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{manga?.title}</h2>
                            <h5 className="main-color-text ">{manga?.author}</h5>
                            <p className="lead" style={{textAlign: "justify"}}>{manga?.description}</p>
                            <StarReviews rating={totalStars} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox mobile={false} manga={manga} currentLoans={currentLoansCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} checkoutManga={checkoutManga} isReviewLeft={isReviewLeft} submitReview={submitReview} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} mangaId={manga?.id} mobile={false}/>
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {manga?.img ? 
                        <img src={manga?.img} alt="manga" 
                            width='226'
                            height='349'
                        />
                    :
                        <img src={require('../../Images/MangasImages/default_image.jpg')} alt="manga" 
                            width='226'
                            height='349'
                        /> 
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{manga?.title}</h2>
                        <h5 className="">{manga?.author}</h5>
                        <p className="lead">{manga?.description}</p>
                        <StarReviews rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox mobile={true} manga={manga} currentLoans={currentLoansCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} checkoutManga={checkoutManga} isReviewLeft={isReviewLeft} submitReview={submitReview}/>

                <hr />
                <LatestReviews reviews={reviews} mangaId={manga?.id} mobile={true}/>

            </div>
        </div>
     );
}
 
export default MangaCheckoutPage;