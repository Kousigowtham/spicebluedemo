import React,{useState} from 'react';
import AddModal from '../AddModal/AddModal';
import './Customcard.scss';

const Customcard = ({task,index,DeleteHandler}) => {

    const [modalStatus, setmodalStatus] = useState(false);
    const [view, setview] = useState(false)
    const viewHandler=()=>{

        setmodalStatus(previousState=>!previousState);
        setview(previousState=>!previousState);
    }

    const EditHandler=()=>{
        setview(false);
        setmodalStatus(previousState=>!previousState);
    }
    
   return (
        <React.Fragment>
            <div className='card-container'>
                <div className='card-hd'>
                    <span>TASK {index+1}</span>
                </div>
                <div className='card-body'>
                    <div className='card-body-img'>img</div>
                    <div className='card-body-msg'>
                        <span>{task.task_msg}</span>
                        <span>{task.task_date}</span>
                    </div>
                </div>
                <div className='logo-container'>
                        <i class="far fa-eye card-edit-logo"  onClick={viewHandler} style={{color:'#3297a8'}} title='view the task'></i>
                        <i className="fa fa-edit card-edit-logo" onClick={EditHandler} title='Edit the task'></i>
                        <i class="fas fa-trash-alt card-edit-logo" style={{color:'rgb(245, 48, 48)'}} onClick={()=>DeleteHandler(task)} title='Delete'></i>
                </div>
            </div>
                {
                modalStatus === true ? <AddModal task={task} handlerType={view} httpMethod='PUT' closeHandler={setmodalStatus}/> : null
                }
        </React.Fragment>
    )
}


export default Customcard
