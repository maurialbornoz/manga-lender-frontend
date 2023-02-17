import ReviewModel from "../../models/ReviewModel";
import StarReviews from "./StarReviews";

interface ReviewProps {
    review: ReviewModel
}

const Review = ({review}:ReviewProps) => {
    const date = new Date(review.date)
    const longMonth = date.toLocaleString("es-ES", {month: 'long'})
    const dateDay = date.getDate()
    const dateYear = date.getFullYear()

    const dateRender = dateDay + ' ' + longMonth + ', ' + dateYear
    return ( 
        <div>
            <div className="col-md-8 col-md-8">
                <h5>{review.userEmail}</h5>
                <div className="row">
                    <div className="col">
                        {dateRender}
                    </div>
                    <div className="col">
                        <StarReviews rating={review.rating} size={16} />
                    </div>
                </div>
                <div className="mt-2">
                    <p>
                        {review.reviewDescription}
                    </p>
                </div>
            </div>
            <hr />
        </div>
    );
}
 
export default Review;