import {useState} from 'react'
import AddMangaRequest from "../../../models/AddMangaRequest";
import { useAuthState } from '../../../context/authContext';
const AddNewManga = () => {
    const authState = useAuthState()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [copies, setCopies] = useState(0)
    const [category, setCategory] = useState('Category')
    const [selectedImage, setSelectedImage] = useState<any>(null)

    const [displayWarning, setDisplayWarning] = useState(false)
    const [displaySuccess, setDisplaySuccess] = useState(false)

    const categoryField = (value: string) => {
        setCategory(value)
    }

    const base64ConversionForImages =  async (e: any) => {
        if(e.target.files[0]){
            getBase64(e.target.files[0])
        }
    }

    const getBase64 = (file: any) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            setSelectedImage(reader.result)
        }
        reader.onerror = function (error) {
            console.error('Error', error)
        }
    }

    const submitNewManga = async () => {
        const url = 'http://localhost:8080/api/admin/secure/add/manga'
        if(authState?.isAuthenticated && title !== '' && author !== '' && category !== 'Category' && description !== '' && copies > 0){
            const manga: AddMangaRequest = new AddMangaRequest(title, author, description, copies, category)
            manga.img = selectedImage
            const reqOpts = {
                method: 'POST',
                headers: {
                    // Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    Authorization: `Bearer ${authState.token}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(manga)
            }

            const submitNewMangaResponse = await fetch(url, reqOpts)
            if(!submitNewMangaResponse.ok){
                throw new Error("Something went wrong");
                

            }
            setTitle('')
            setAuthor('')
            setDescription('')
            setCopies(0)
            setCategory('Category')
            setSelectedImage(null)
            setDisplaySuccess(true)
            setDisplayWarning(false)
        } else {
            setDisplayWarning(true)
            setDisplaySuccess(false)
        }
    }

    const categories = ['Action', 'Adventure', 'Science Fiction', 'Comedy', 'Sport', 'Drama', 'Mecha', 'Mystery', 'Music', 'Psychological', 'Slice of Life', 'Romantic' , 'School']


    return (  
        <div className="container mt-5 mb-5">
            {displaySuccess && 
                <div className="alert alert-success" role="alert" >
                    Manga added successfully
                </div>
                
            }
            {displayWarning && 
                <div className="alert alert-danger" role="alert" >
                    All fields must be filled out
                </div>
                
            }
            <div className="card">
                <div className="card-header">
                    Add a new manga
                </div>
                <div className="card-body">
                    <form method="post">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" required onChange={e => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Author</label>
                                <input type="text" className="form-control" name="author" required onChange={e => setAuthor(e.target.value)} value={author} />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Category</label>
                                <button className="form-control btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle='dropdown' aria-expanded='false'>
                                    {category}
                                </button>
                                <ul className="dropdown-menu" id="addNewMangaId" aria-labelledby="dropdownMenuButton1">
                                {categories.map((category) => (
                                    <li key={category} onClick={() => categoryField(category)}>
                                        <a href="#" className="dropdown-item">{category}</a>
                                    </li>
                                ))}
                                    {/* <li><a onClick={() => categoryField('FE')} className="dropdown-item">Front End</a></li>
                                    <li><a onClick={() => categoryField('BE')} className="dropdown-item">Back End</a></li>
                                    <li><a onClick={() => categoryField('Data')} className="dropdown-item">Data</a></li>
                                    <li><a onClick={() => categoryField('DevOps')} className="dropdown-item">DevOps</a></li>
                                    <li><a onClick={() => categoryField('Adventure')} className="dropdown-item">Adventure</a></li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Copies</label>
                            <input type="number" className="form-control" name="Copies" required  onChange={e => setCopies(Number(e.target.value))} value={copies}/>
                        </div>
                        <input type="file" onChange={e => base64ConversionForImages(e)} />
                        <div>
                            <button onClick={submitNewManga} type='button' className="btn btn-custom mt-3">
                                Add Manga
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}
 
export default AddNewManga;