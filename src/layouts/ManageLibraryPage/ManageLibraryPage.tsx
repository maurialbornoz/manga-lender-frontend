import { useState } from "react";
import { Redirect } from "react-router-dom";
import AdminMessages from "./components/AdminMessages";
import AddNewManga from "./components/AddNewManga";
import ChangeQuantityOfMangas from "./components/ChangeQuantityOfMangas";
import { useAuthState } from "../../context/authContext";

const ManageLibraryPage = () => {
    const authState = useAuthState()

    const [changeQuantityOfMangasClick, setChangeQuantityOfMangasClick] = useState(false)
    const [messagesClick, setMessagesClick] = useState(false)

    const addMangaClickFunction = () => {
        setChangeQuantityOfMangasClick(false)
        setMessagesClick(false)
    }

    const changeQuantityMangasClickFunction = () => {
        setChangeQuantityOfMangasClick(true)
        setMessagesClick(false)
    }

    const messagesClickFunction = () => {
        setChangeQuantityOfMangasClick(false)
        setMessagesClick(true)
    }

    // if(authState?.accessToken?.claims.userType === undefined){
    if(authState?.role !== "ADMIN"){
        return <Redirect to="/"/>
    }

    return (  
        <div className="container">
            <div className="mt-5">
                <h3>Manage Library</h3>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button onClick={addMangaClickFunction} className="nav-link active" id="nav-add-manga-tab" data-bs-toggle="tab" data-bs-target="#nav-add-manga" type="button" role="tab" aria-controls="nav-add-manga" aria-selected="false">
                            Add new Manga
                        </button>
                        <button onClick={changeQuantityMangasClickFunction} className="nav-link" id="nav-quantity-tab" data-bs-toggle="tab" data-bs-target="#nav-quantity" type="button" role="tab" aria-controls="nav-quantity" aria-selected="true">
                            Change quantity
                        </button>
                        <button onClick={messagesClickFunction} className="nav-link" id="nav-messages-tab" data-bs-toggle="tab" data-bs-target="#nav-messages" type="button" role="tab" aria-controls="nav-messages" aria-selected="true">
                            Messages
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-add-manga" role="tabpanel" aria-labelledby="nav-add-manga-tab">
                        <AddNewManga/>
                    </div>
                    <div className="tab-pane fade" id="nav-quantity" role="tabpanel" aria-labelledby="nav-quantity-tab">
                        {changeQuantityOfMangasClick ? <ChangeQuantityOfMangas/> : <></>}
                    </div>
                    <div className="tab-pane fade" id="nav-messages" role="tabpanel" aria-labelledby="nav-messages-tab">
                        {messagesClick ? <AdminMessages/> : <></>}
                    </div>
                </div>
            </div>
        </div>

    );
}
 
export default ManageLibraryPage;