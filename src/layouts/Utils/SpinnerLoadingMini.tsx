const SpinnerLoadingMini = () => {
    return ( 
        <div className="container d-flex justify-content-center" style={{height:30}}>
            <div className="spinner-border text-primary" role='status'>
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>
        </div>
     );
}
 
export default SpinnerLoadingMini;