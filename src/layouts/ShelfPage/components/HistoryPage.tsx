import { useEffect, useState } from "react";
import HistoryModel from "../../../models/HistoryModel";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import Pagination from "../../Utils/Pagination";
import { useAuthState } from "../../../context/authContext";

const HistoryPage = () => {
    const authState = useAuthState()

    const [isLoadingHistory, setIsLoadingHistory] = useState(true)
    const [httpError, setHttpError ] = useState(null)


    const [histories, setHistories] = useState<Array<HistoryModel>>([])
    const [ currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchUserHistory = async () => {
            if(authState && authState.isAuthenticated){
                // const url = `http://localhost:8080/api/histories/search/findHistoriesByUserEmail?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage - 1}&size=5`
                const url = `http://localhost:8080/api/histories/search/findHistoriesByUserEmail?userEmail=${authState.email}&page=${currentPage - 1}&size=5`
                const reqOpts = {
                    method: 'GET',
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                }
                const historyRes = await fetch(url, reqOpts)
                if(!historyRes.ok){
                    throw new Error("Something went wrong");
                    
                }
                const historyResJSON = await historyRes.json()
                setHistories(historyResJSON._embedded.histories)
                setTotalPages(historyResJSON.page.totalPages)
            }
            setIsLoadingHistory(false)
        }
        fetchUserHistory().catch((error: any) => {
            setIsLoadingHistory(false)
            setHttpError(error.message)
        })
    }, [authState, currentPage])

    if(isLoadingHistory){
        return <SpinnerLoading/>
    }

    if(httpError){
        return (
            <div className="mt-5 container">
                <p>{httpError}</p>
            </div>
        )
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    

    return ( 
        <div className="mt-2">
            {histories.length > 0 ?
                <>
                    <h5>Recent History:</h5>
                    {histories.map((history) => (
                        <div key={history.id}>
                            <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                                <div className="row g-0">
                                    <div className="col-md-2">
                                        <div className="d-none d-lg-block">
                                            {history.img ? 
                                                <img
                                                    src={history.img}
                                                    width='163'
                                                    height='236'
                                                    alt='history'
                                                />
                                            : 
                                                <img
                                                    src={require('./../../../Images/MangasImages/default_image.jpg')}
                                                    width='163'
                                                    height='236'
                                                    alt='history'
                                                />
                                            }
                                        </div>
                                        <div className="d-lg-none d-flex justify-content-center align-items-center">
                                            {history.img ? 
                                                <img
                                                    src={history.img}
                                                    width='123'
                                                    height='196'
                                                    alt='history'
                                                />
                                            : 
                                                <img
                                                    src={require('./../../../Images/MangasImages/default_image.jpg')}
                                                    width='123'
                                                    height='196'
                                                    alt='history'
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card-body">
                                            <h5 className="card-title">{history.author}</h5>
                                            <h4>{history.title}</h4>
                                            <p className="card-text" style={{textAlign: "justify"}}>{history.description}</p>
                                            <hr />
                                            <p className="card-text">Checked out on: {history.checkoutDate}</p>
                                            <p className="card-text">Returned on: {history.returnDate}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <hr />
                        </div>
                    ))}
                </>
            :
                <>
                    <h3 className="mt-3">Currently no history: </h3>
                    <Link className="btn btn-link" to={'search'}>Search for new mangas</Link>
                </>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );
}
 
export default HistoryPage;