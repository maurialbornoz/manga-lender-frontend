import MessageModel from "../../../models/MessageModel";
import {useState} from 'react'
interface AdminMessageProps {
    message: MessageModel,
    submitResponseToQuestion: any
}

const AdminMessage = ({message, submitResponseToQuestion} : AdminMessageProps) => {
    const [displayWarning, setDisplayWarning] = useState(false)
    const [response, setResponse ] = useState('')

    const submitBtn = () => {
        if(message.id !== null && response !== ''){
            submitResponseToQuestion(message.id, response)
            setDisplayWarning(false)
        } else {
            setDisplayWarning(true)
        }
    }

    return (  
        <div key={message.id}>
            <div className="card mt-2 shadow p-3 bg-body rounded">
                <h5>Case #{message.id}: {message.title}</h5>
                <h6>{message.userEmail}</h6>
                <p>{message.question}</p>
                <hr />
                <div>
                    <h5>Response: </h5>
                    <form action="PUT">
                        {
                            displayWarning && 
                            <div className="alert alert-danger" role="alert">
                                All fields must be filled out.
                            </div>
                        }
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Description</label>
                            <textarea name="" id="exampleFormControlTextarea1" rows={3} className="form-control"  onChange={e => setResponse(e.target.value)}></textarea>

                        </div>
                        <div>
                            <button className="btn btn-primary mt-3" onClick={submitBtn} type="button">
                                Submit Response
                            </button>  
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default AdminMessage;