import { Link } from "react-router-dom";
import MangaModel from "../../../models/MangaModel";

interface SearchMangaProps {
    manga: MangaModel
}

const SearchManga = ({ manga }: SearchMangaProps) => {
    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-3">

                    <div className=" d-none d-lg-block mx-auto">
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
                                width='123'
                                height='196'
                                alt='manga'
                            />
                            :
                            <img src={require('../../../Images/MangasImages/default_image.jpg')}
                                width='123'
                                height='196'
                                alt='manga'
                            />

                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title main-color-text">
                            {manga.author}
                        </h5>
                        <h4>
                            {manga.title}
                        </h4>
                        <p className="card-text" style={{textAlign: "justify"}}>
                            {manga.description}
                        </p>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <Link to={`/checkout/${manga.id}`} className="btn btn-link">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchManga;