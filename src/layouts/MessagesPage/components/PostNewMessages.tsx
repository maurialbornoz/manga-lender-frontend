import {useState} from 'react'
import MessageModel from "../../../models/MessageModel";
import { useAuthState } from '../../../context/authContext';
const PostNewMessages = () => {

    const authState = useAuthState()

    const [title, setTitle] = useState("")
    const [question, setQuestion] = useState("")
    const [displayWarning, setDisplayWarning] = useState(false)
    const [displaySuccess, setDisplaySuccess] = useState(false)
    

    const submitNewQuestion = async () => {
        const url = `http://localhost:8080/api/messages/secure/add/message`
        // if(authState?.isAuthenticated && title !== '' && question !== ''){
        if(authState?.isAuthenticated && title !== '' && question !== ''){
            const messageRequestModel: MessageModel = new MessageModel(title, question)
            const reqOpts = {
                method: 'POST',
                headers: {
                    // Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    Authorization: `Bearer ${authState.token}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(messageRequestModel)
            }
            const submitNewQuestionResponse = await fetch(url, reqOpts)
            if(!submitNewQuestionResponse.ok){
                throw new Error("Something went wrong");
            }
            setTitle('')
            setQuestion('')
            setDisplayWarning(false)
            setDisplaySuccess(true)
        } else {
            setDisplayWarning(true)
            setDisplaySuccess(false)

        }
    }

    return ( 
        <div  className="card mt-3">
            <div className="card-header">
                Ask question to admin
            </div>
            <div className="card-body">
                <form method="POST">
                    {displayWarning &&
                        <div className="alert alert-danger" role="alert">
                            All fields must be filled out
                        </div>
                    }
                    {displaySuccess && 
                        <div className="alert alert-success" role="alert">
                            Question added successfully
                        </div>
                    }
                    <div className="mb-3">
                        <label className="form-label">
                            Title
                        </label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" onChange={e => setTitle(e.target.value)} value={title}/>

                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Question
                        </label>
                        <textarea id="exampleFormControlTextArea1" rows={3} className="form-control" onChange={e => setQuestion(e.target.value)} value={question}></textarea>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary mt-3" onClick={submitNewQuestion}>
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default PostNewMessages;