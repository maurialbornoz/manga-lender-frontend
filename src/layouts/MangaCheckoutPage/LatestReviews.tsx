import { Link } from "react-router-dom";
import ReviewModel from "../../models/ReviewModel";
import Review from "../Utils/Review";

interface LatestReviewsProps {
    reviews: Array<ReviewModel>
    mangaId: number | undefined
    mobile: boolean
}

const LatestReviews = ({reviews, mangaId, mobile} : LatestReviewsProps ) => {
    return ( 
        <div className={mobile ? 'mt-3' : 'row mt-5'}>
            <div className={mobile ? '' : 'col-sm-2 col-md-2'}>
                <h2>Latest Reviews: </h2>

            </div>
            <div className="col-sm-10 col-md-10">
                {reviews.length > 0 ? 
                    <>
                        {reviews.slice(0, 3).map(review => (
                            <Review review={review} key={review.id}></Review>
                        ))}
                        {/* <div className="m-3">
                            <Link type="button" className="btn main-color btn-md text-white" to='#' >View All Reviews</Link>
                        </div> */}
                    </>
                :
                    <div className="m-5">
                        <p className="lead">
                            Currently there are no reviews for this manga.
                        </p>
                    </div>
                } 
            </div>
        </div>
     );
}
 
export default LatestReviews;