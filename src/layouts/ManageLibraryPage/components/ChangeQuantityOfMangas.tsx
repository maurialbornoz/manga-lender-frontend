import { useEffect, useState } from "react"
import MangaModel from "../../../models/MangaModel"
import SpinnerLoading from "../../Utils/SpinnerLoading"
import Pagination from "../../Utils/Pagination"
import ChangeQuantityOfManga from "./ChangeQuantityOfManga"

const ChangeQuantityOfMangas = () => {
    const [mangas, setMangas] = useState<Array<MangaModel>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [httpError, setHttpError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [mangasPerPage] = useState(3)
    const [totalAmountOfMangas, setTotalAmountOfMangas] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [mangaDelete, setMangaDelete] = useState(false)

    useEffect(() => {
        const fetchMangas = async () => {
            const baseUrl: string = `http://localhost:8080/api/mangas?page=${currentPage - 1}&size=${mangasPerPage}`
            const response = await fetch(baseUrl)
            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            const JSONres = await response.json()
            const responseData = JSONres._embedded.mangas
            setTotalAmountOfMangas(JSONres.page.totalElements)
            setTotalPages(JSONres.page.totalPages)
            setMangas(responseData)
            setIsLoading(false)
        }
        fetchMangas().catch((error: any) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [currentPage, mangaDelete])
    

    const indexOfLastManga: number = currentPage * mangasPerPage
    const indexOfFirstManga: number = indexOfLastManga - mangasPerPage
    let lastItem = mangasPerPage * currentPage <= totalAmountOfMangas ? mangasPerPage * currentPage : totalAmountOfMangas

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const deleteManga = () => setMangaDelete(!mangaDelete)

    if (isLoading) {
        return (
            <div className="container m-5">
                <SpinnerLoading />
            </div>
        )
    }

    if (httpError) {
        <div className="container m-5">
            <p>{httpError}</p>
        </div>
    }
    
    return (  
        <div className="container mt-5">
            {totalAmountOfMangas > 0 ?
                <>
                    <div className="mt-3">
                        <h3>Number of results: ({totalAmountOfMangas})</h3>
                    </div>
                    <p>
                        {indexOfFirstManga + 1} to {lastItem} of {totalAmountOfMangas} items:
                    </p>
                    <div className="mb-5">

                        {mangas.map(manga => (
                            <ChangeQuantityOfManga manga={manga} key={manga.id} deleteManga={deleteManga}/>
                        ))}
                    </div>
                </>
            : 
                <h5>Add a manga before changing quantity</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}
 
export default ChangeQuantityOfMangas;