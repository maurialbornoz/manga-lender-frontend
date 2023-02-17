import MangaModel from "./MangaModel";

class ShelfCurrentLoans {
    manga: MangaModel
    daysLeft: number

    constructor(manga: MangaModel, daysLeft: number) {
        this.manga = manga
        this.daysLeft = daysLeft
    }
    
}

export default ShelfCurrentLoans