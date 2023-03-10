import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import Pagination from "../../Utils/Pagination";
import { useAuthState } from "../../../context/authContext";
const Messages = () => {

    const authState = useAuthState()
    const [isLoadingMessages, setIsLoadingMessages] = useState(true)
    const [httpError, setHttpError] = useState(null)

    const [messages, setMessages] = useState<Array<MessageModel>>([])
    
    const [messagePerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchUserMessages = async () => {
            // if(authState && authState.accessToken?.accessToken){
            if(authState && authState.token){
                // const url = `http://localhost:8080/api/messages/search/findByUserEmail?userEmail=${authState.accessToken.claims.sub}&page=${currentPage - 1}&size=${messagePerPage}`
                const url = `http://localhost:8080/api/messages/search/findByUserEmail?userEmail=${authState.email}&page=${currentPage - 1}&size=${messagePerPage}`
                const reqOpts = {
                    method: 'GET',
                    headers: {
                        // Authorization: `Bearer ${authState.accessToken.accessToken}`,
                        Authorization: `Bearer ${authState.token}`,
                        'Content-Type' : 'application/json'
                    }
                }
                const messagesResponse = await fetch(url, reqOpts)
                if(!messagesResponse.ok){
                    throw new Error("Something went wrong");
                    
                }
                const messagesResponseJSON = await messagesResponse.json()
                setMessages(messagesResponseJSON._embedded.messages)
                setTotalPages(messagesResponseJSON.page.totalPages)
            }
            setIsLoadingMessages(false)
        }
        fetchUserMessages().catch((error: any) => {
            setIsLoadingMessages(false)
            setHttpError(error.message)
        })
        window.scrollTo(0, 0)
    }, [authState, currentPage])

    if(isLoadingMessages){
        return <SpinnerLoading/>
    }


    if(httpError){
        return(
            <div className="container mt-5">
                {httpError}
            </div>
        )
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return ( 
        <div className="mt-2">
            {messages.length > 0 ? 
                <>
                    <h5>Current Q/A: </h5>
                    {messages.map((message) => (
                        <div key={message.id}>
                            <div className="card mt-2 shadow p-3 bg-body rounded">
                                <h5>Case #{message.id}: {message.title}</h5>
                                <h6>{message.userEmail}</h6>
                                <p>{message.question}</p>
                                <hr />
                                <div>
                                    <h5>Response: </h5>
                                    {message.response && message.adminEmail ? 
                                        <>
                                            <h6>{message.adminEmail} (admin)</h6>
                                            <p>{message.response}</p>
                                        </>
                                    :
                                        <p><i>Pending response from administration. Please be patient.</i></p>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            :
                <h5>All questions that you submit will be displayed here.</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}
 
export default Messages;