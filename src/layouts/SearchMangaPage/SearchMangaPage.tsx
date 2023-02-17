import { useState, useEffect } from "react";
import MangaModel from "../../models/MangaModel";
import SpinnerLoading from "../Utils/SpinnerLoading";
import SearchManga from "./components/SearchManga";
import Pagination from "../Utils/Pagination";
const SearchMangaPage = () => {
    const [mangas, setMangas] = useState<Array<MangaModel>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [httpError, setHttpError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [mangasPerPage] = useState(5)
    const [totalAmountOfMangas, setTotalAmountOfMangas] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [categorySelection, setCategorySelection] = useState('Category')

    const [orderSelection, setOrderSelection] = useState('Order')
    const [orderBySelection, setOrderBySelection] = useState('')


    const [search, setSearch] = useState('')
    const [searchUrl, setSearchUrl] = useState('')

    useEffect(() => {
        const fetchMangas = async () => {
            const baseUrl: string = "http://localhost:8080/api/mangas"
            let url: string = ''

            if(searchUrl !== ''){
                url = baseUrl + searchUrl
                setCategorySelection('Category')
                setOrderSelection('Order')
            } else {

                if(searchUrl === '' && (categorySelection === '' || categorySelection === 'Category') && orderBySelection === ''){
                    url = `${baseUrl}?page=${currentPage - 1}&size=${mangasPerPage}`
                } else {

                    if(categorySelection === '' || categorySelection === 'All' || categorySelection === 'Category'){
                        if(orderBySelection !== ''){
                            url = `${baseUrl}/search/findByOrderBy${orderBySelection}?page=${currentPage - 1}&size=${mangasPerPage}`
                        }
                    } else {
                        if(orderBySelection === ''){
                            url = `${baseUrl}/search/findByCategory?category=${categorySelection}&page=${currentPage - 1}&size=${mangasPerPage}`
                        } else {
                            url = `${baseUrl}/search/findByCategoryOrderBy${orderBySelection}?category=${categorySelection}&page=${currentPage - 1}&size=${mangasPerPage}`
                        }
                    }
                }
            }
            

            const response = await fetch(url)
            
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
        window.scrollTo(0, 0)
    }, [currentPage, searchUrl, categorySelection, orderBySelection])


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

    const searchHandleChange = () => {
        if (search === '') {
            setSearchUrl('')
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size${mangasPerPage}`)
        }
    }

    const categories = ['Action', 'Adventure', 'Science Fiction', 'Comedy', 'Sport', 'Drama', 'Mecha', 'Mystery', 'Music', 'Psychological', 'Slice of Life', 'Romantic' , 'School']

    const categoryField = (value: string) => {

        // if(value === 'Acción' || value === 'Aventura' || value === 'Ciencia Ficción' || value === 'Comedia' || value === 'Deporte'){
        if(categories.includes(value) ){
            setCategorySelection(value)
            // setSearchUrl(`/search/findByCategory?category=${value}&page=0&size=${mangasPerPage}`)
        } else {
            setCategorySelection('All')
            // setSearchUrl(`?page=0&size=${mangasPerPage}`)
        }
        setSearchUrl('')
    }

    const orders = ['Title A-Z', 'Title Z-A']

    const orderField = async (value: string) => {
        if(value === 'Title A-Z'){
            setOrderSelection(value)
            setOrderBySelection('TitleAsc')
        }
        if(value === 'Title Z-A'){
            setOrderSelection(value)
            setOrderBySelection('TitleDesc')

            
        }
        setSearchUrl('')
    }

    const indexOfLastManga: number = currentPage * mangasPerPage
    const indexOfFirstManga: number = indexOfLastManga - mangasPerPage
    let lastItem = mangasPerPage * currentPage <= totalAmountOfMangas ? mangasPerPage * currentPage : totalAmountOfMangas

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="container">
            <div>
                <div className="row mt-5">
                    <div className="col-6 mb-2">
                        <div className="d-flex">
                            <input type="search" className="form-control me-2" placeholder="Search" aria-labelledby="Search" onChange={e => setSearch(e.target.value)} />
                            <button className="btn btn-custom" onClick={() => searchHandleChange()}>Search</button>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {categorySelection}
                            </button>

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={() => categoryField('All')}>
                                        <a href="#" className="dropdown-item">All</a>
                                    </li>
                                {categories.map((category) => (
                                    <li key={category} onClick={() => categoryField(category)}>
                                        <a href="#" className="dropdown-item">{category}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {orderSelection}
                            </button>
                        

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    {/* <li onClick={() => orderField('Title A-Z')}>
                                        <a href="#" className="dropdown-item">Title A-Z</a>
                                    </li> */}
                                {orders.map((order) => (
                                    <li key={order} onClick={() => orderField(order)}>
                                        <a href="#" className="dropdown-item">{order}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    {totalAmountOfMangas > 0 ?
                        <>
                            <div className="mt-3">
                                <h5>Number of results: ({totalAmountOfMangas})</h5>
                            </div>
                            <p>{indexOfFirstManga + 1} to {lastItem} of {totalAmountOfMangas} items:</p>
                            <div className="mb-5">

                                {mangas.map(manga => (
                                    <SearchManga manga={manga} key={manga.id} />
                                ))}
                            </div>
                        </>
                        :
                        <div className="m-5">
                            <h3>Can't find what you are looking for?</h3>
                            <a href="" type="button" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white mt-3">Library Services</a>
                        </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchMangaPage;