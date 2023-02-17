import { Link } from "react-router-dom";
import MangaModel from "../../models/MangaModel";
import LeaveAReview from "../Utils/LeaveAReview";

interface CheckoutAndReviewBoxProps {
    manga: MangaModel | undefined,
    mobile: boolean,
    currentLoans: number,
    isAuthenticated: any,
    isCheckedOut: boolean,
    checkoutManga: any,
    isReviewLeft: boolean,
    submitReview: any
}

const CheckoutAndReviewBox = ({manga, mobile, currentLoans, isAuthenticated, isCheckedOut, checkoutManga, isReviewLeft, submitReview} : CheckoutAndReviewBoxProps) => {

    const buttonRender = () => {

        if(isAuthenticated){
            if(!isCheckedOut && currentLoans < 5){
                return (<button onClick={checkoutManga} className="btn btn-custom btn-lg">Checkout</button>)
            } else if(isCheckedOut){
                return(<p><b>Manga checked out.</b></p>)
            } else if(!isCheckedOut ){
                return(<p className="text-danger">You reached the limit.</p>)
            }
        }
        return (<Link to={'/login'} className="btn btn-custom btn-lg">Sign In</Link>)
    }

    const reviewRender = () => {
        if(isAuthenticated && !isReviewLeft){
            return (<LeaveAReview submitReview={submitReview}/>)
        } else if(isAuthenticated && isReviewLeft){
            return(<p><b>Thank you for your review!</b></p>)
        } 
        return (
            <div>
                <hr />
                <p>Sign in to leave a review.</p>
            </div>
        )
    }

    return ( 
        <div className={mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{currentLoans}/5 </b>
                        Mangas checked out
                    </p>
                    <hr />
                    {manga && manga.copiesAvailable && manga.copiesAvailable > 0 ? 
                        <h4 className="main-color-text">Available</h4>
                    :
                        <h4 className="main-color-text">Wait list</h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{manga?.copies} </b>
                            copies
                        </p>
                        <p className="col-6 lead">
                            <b>{manga?.copiesAvailable} </b>
                            Available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className="mt-3">
                    This number can change until placing order has been completed.
                </p>
                {reviewRender()}
            </div>
        </div>

     );
}
 
export default CheckoutAndReviewBox;