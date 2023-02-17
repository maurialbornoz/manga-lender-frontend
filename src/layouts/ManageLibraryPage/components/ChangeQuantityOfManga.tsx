import { useEffect, useState } from "react";
import MangaModel from "../../../models/MangaModel";
import { useAuthState } from "../../../context/authContext";

interface ChangeQuantityOfMangaProps{
    manga: MangaModel,
    deleteManga: any
}

const ChangeQuantityOfManga = ({manga, deleteManga}: ChangeQuantityOfMangaProps) => {
    const authState = useAuthState()

    const [quantity, setQuantity] = useState<number>(0)
    const [remaining, setRemaining] = useState(0)

    useEffect(() => {
        const fetchMangaInState = ( ) => {
            manga.copies ? setQuantity(manga.copies) : setQuantity(0)
            manga.copiesAvailable ? setRemaining(manga.copiesAvailable) : setRemaining(0)
        }

        fetchMangaInState()
    }, [])

    const increaseQuantity = async () => {
        const url = `http://localhost:8080/api/admin/secure/increase/manga/quantity?mangaId=${manga.id}`
        const reqOpts = {
            method: 'PUT',
            headers: {
                // Authorization : `Bearer ${authState?.accessToken?.accessToken}`,
                Authorization : `Bearer ${authState?.token}`,
                'Content-Type' : 'application/json'
            }


        }
        const quantityUpdateResponse = await fetch(url, reqOpts)
        if(!quantityUpdateResponse.ok){
            throw new Error("Something went wrong");
            
        }

        setQuantity(quantity + 1)
        setRemaining(remaining + 1)
    }

    const decreaseQuantity = async () => {
        const url = `http://localhost:8080/api/admin/secure/decrease/manga/quantity?mangaId=${manga.id}`
        const reqOpts = {
            method: 'PUT',
            headers: {
                // Authorization : `Bearer ${authState?.accessToken?.accessToken}`,
                Authorization : `Bearer ${authState?.token}`,
                'Content-Type' : 'application/json'
            }


        }
        const quantityUpdateResponse = await fetch(url, reqOpts)
        if(!quantityUpdateResponse.ok){
            throw new Error("Something went wrong");
            
        }

        setQuantity(quantity - 1)
        setRemaining(remaining - 1)
    }

    const deleteMangaFunction = async () => {
        const url = `http://localhost:8080/api/admin/secure/delete/manga?mangaId=${manga.id}`
        const reqOpts = {
            method: 'DELETE',
            headers: {
                // Authorization : `Bearer ${authState?.accessToken?.accessToken}`,
                Authorization : `Bearer ${authState?.token}`,
                'Content-Type' : 'application/json'
            }


        }
        const UpdateResponse = await fetch(url, reqOpts)
        if(!UpdateResponse.ok){
            throw new Error("Something went wrong");
            
        }

        deleteManga()
    }

    return (  
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {manga.img ?
                            <img src={manga.img}
                                width='163'
                                height='236'
                                alt='manga'
                            />
                            :
                            <img src={require('../../../Images/MangasImages/default_image.jpg')}
                                width='163'
                                height='236'
                                alt='manga'
                            />

                        }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        {manga.img ?
                            <img src={manga.img}
                                width='163'
                                height='236'
                                alt='manga'
                            />
                            :
                            <img src={require('../../../Images/MangasImages/default_image.jpg')}
                                width='163'
                                height='236'
                                alt='manga'
                            />

                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{manga.author}</h5>
                        <h4>{manga.title}</h4>
                        <p className="card-text" style={{textAlign: "justify"}} >{manga.description} </p>
                    </div>
                </div>
                <div className="mt-3 col-md-3">
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Total quantity: <b>{quantity}</b></p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Mangas remaining: <b>{remaining}</b></p>
                    </div>
                    <div className="row m-3">
                        <button className="m-1 btn btn-custom" onClick={increaseQuantity}>Add quantity</button>
                        <button className="m-1 btn btn-md btn-outline-primary" onClick={decreaseQuantity}>Decrease quantity</button> 
                        <button className="m-1 btn btn-md btn-outline-danger" onClick={deleteMangaFunction}>Delete</button>
                    </div>
                </div>
                {/* <div className="mt-3 col-md-1">
                    <div className="d-flex justify-content-start">
                        <button className="m-1 btn btn-md btn-danger">Delete</button>
                    </div>
                </div>
                <button className="m-1 btn btn-md main-color text-white">Add quantity</button>
                <button className="m-1 btn btn-md btn-warning">Decrease quantity</button> */}

            </div>
        </div>
    );
}
 
export default ChangeQuantityOfManga;