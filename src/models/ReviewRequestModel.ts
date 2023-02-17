class ReviewRequestModel {
    rating: number 
    mangaId: number
    reviewDescription?: string

    constructor(rating: number, mangaId: number, reviewDescription?: string){
        this.rating = rating
        this.mangaId = mangaId
        this.reviewDescription = reviewDescription
    }
}

export default ReviewRequestModel