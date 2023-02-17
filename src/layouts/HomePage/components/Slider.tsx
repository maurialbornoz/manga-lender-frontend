import ReturnManga from "./ReturnManga"
import { useEffect, useState } from "react"
import MangaModel from "../../../models/MangaModel"
import SpinnerLoading from "../../Utils/SpinnerLoading"
import { Link } from "react-router-dom"

const Slider = () => {
    const [mangas, setMangas] = useState<Array<MangaModel>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [httpError, setHttpError] = useState(null)

    useEffect(() => {
        const fetchMangas = async () => {
            const baseUrl: string = "http://localhost:8080/api/mangas"
            const url: string = `${baseUrl}?page=0&size=9`

            const response = await fetch(url)
            if(!response.ok){
                throw new Error("Something went wrong")
            }

            const JSONres = await response.json()
            const responseData = JSONres._embedded.mangas

            setMangas(responseData)
            setIsLoading(false)
        }
        fetchMangas().catch((error: any) => {
            setIsLoading(false)
            setHttpError(error.message)
        }) 
    }, [])

    if(isLoading){
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

    if(mangas.length === 0){
        return <div className="container m-5"></div>
    }

    return (
        <div className="container mt-5" style={{ height: 600 }}>
            <div className="homepage-carousel-title">
                <h3>Discover New Stories</h3>
            </div>

            {mangas.length > 3 ? 
            
                <div className="carousel carousel-dark slide mt-5 d-none d-lg-block" id="carouselExampleControls" data-bs-interval='false'>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row d-flex justify-content-center align-items-center">
                                {mangas.slice(0, 3).map(manga => (
                                    <ReturnManga manga={manga} key={manga.id}/>
                                ))}
                            </div>
                        </div>
                        <div className="carousel-item ">
                            <div className="row d-flex justify-content-center align-items-center">
                                {mangas.slice(3, 6).map(manga => (
                                    <ReturnManga manga={manga} key={manga.id}/>
                                ))}
                            </div>
                        </div>
                        {/* <div className="carousel-item ">
                            <div className="row d-flex justify-content-center align-items-center">
                                <ReturnManga />
                                <ReturnManga />
                                <ReturnManga />
                            </div>
                        </div> */}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className="carousel-control-prev-icon" aria-hidden='true'> </span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className="carousel-control-next-icon" aria-hidden='true'> </span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            :
                <div className="row d-flex justify-content-center align-items-center">
                    {mangas.slice(0, mangas.length).map(manga => (
                        <ReturnManga manga={manga} key={manga.id}/>
                    ))}
                </div>
            }

            {/* Mobile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnManga manga={mangas[0]} key={mangas[0].id} />
                </div>
            </div>

            <div className="homepage-carousel-title mt-3">
                <Link className="btn btn-outline-secondary btn-lg" to='/search'>View More</Link>
            </div>
        </div>

    )
}

export default Slider
