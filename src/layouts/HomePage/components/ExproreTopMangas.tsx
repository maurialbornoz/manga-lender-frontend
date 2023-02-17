import { Link } from "react-router-dom"

const ExproreTopMangas = () => {
  return (
    <div className="p-5 mb-4 bg-dark header">
      <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
        <div>
            <h1 className="display-5 fw-bold">¡Welcome!</h1>
            <p className=" fs-4">Explore our extensive catalog and choose which stories you want to enjoy</p>
            <Link type="button" className="btn main-color btn-lg text-white" to='/search'>Top Mangas</Link>
        </div>
      </div>
    </div>
  )
}

export default ExproreTopMangas
