import { Link } from "react-router-dom";
import MangaModel from "../../../models/MangaModel";

interface ReturnMangaProps {
    manga: MangaModel
}

const ReturnManga = ({manga}: ReturnMangaProps) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {manga.img ? 
                    <img
                        src={manga.img}
                        width='171'
                        height='253'
                        alt='manga'
                    />
                : 
                    <img
                        src={require('./../../../Images/MangasImages/default_image.jpg')}
                        width='151'
                        height='233'
                        alt='manga'
                    />
                }
                

                <h6 className="mt-2">{manga.title}</h6>
                <p>{manga.author}</p>
                <Link to={`/checkout/${manga.id}`} className="btn main-color text-white">Reserve</Link>
            </div>
        </div>
    );
}

export default ReturnManga;