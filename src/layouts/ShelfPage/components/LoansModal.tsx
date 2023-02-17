import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";

interface LoansModalProps {
    shelfCurrentLoan: ShelfCurrentLoans
    mobile: boolean,
    returnManga: any,
    renewLoan: any
}

const LoansModal = ({shelfCurrentLoan, mobile, returnManga, renewLoan} : LoansModalProps) => {
    return ( 
        <div className="modal fade" id={mobile ? `mobilemodal${shelfCurrentLoan.manga.id}` : `modal${shelfCurrentLoan.manga.id}`} data-bs-backdrop='static' data-bs-keyboard='false' aria-labelledby="staticBackdropLabel" aria-hidden='true' key={shelfCurrentLoan.manga.id}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id='staticBackdropLabel' >
                            Loan Options

                        </h5>
                        <button type='button' className="btn-close " data-bs-dismiss='modal' aria-label="Close">

                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-2">
                                        {shelfCurrentLoan.manga?.img ? 
                                            <img src={shelfCurrentLoan.manga.img} width='56' height='87' alt="Manga" />
                                        :
                                            <img src={require('./../../../Images/MangasImages/default_image.jpg')} width='56' height='87' alt="Manga" />    
                                        }
                                    </div>
                                    <div className="col-10">
                                        <h6>{shelfCurrentLoan.manga.author}</h6>
                                        <h4>{shelfCurrentLoan.manga.title}</h4>
                                    </div>
                                </div>
                                <hr />
                                {shelfCurrentLoan.daysLeft > 0 && 
                                    <p className="text-secondary">
                                        Due in {shelfCurrentLoan.daysLeft} days.
                                    </p>
                                }
                                {shelfCurrentLoan.daysLeft === 0 && 
                                    <p className="text-success">
                                        Due Today.
                                    </p>
                                }
                                {shelfCurrentLoan.daysLeft < 0 &&
                                    <p className="text-danger">
                                        Past due by {shelfCurrentLoan.daysLeft} days.
                                    </p>
                                }

                                <div className="list-group mt-3">
                                    <button onClick={() => returnManga(shelfCurrentLoan.manga.id)} data-bs-dismiss='modal' className="list-group-item list-group-item-action" aria-current='true'>
                                        Return Manga
                                    </button>
                                    <button onClick={shelfCurrentLoan.daysLeft > 0 ? (e) => e.preventDefault() : () => renewLoan(shelfCurrentLoan.manga.id)} data-bs-dismiss='modal' className={shelfCurrentLoan.daysLeft < 0 ? 'list-group-item list-group-item-action inactiveLink' : 'list-group-item list-group-item-action'}>
                                        {shelfCurrentLoan.daysLeft < 0 ? 'Late dues cannot be renewed' : 'Renew for 7 days'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss='modal'>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

     );
}
 
export default LoansModal;