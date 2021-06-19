import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Taskpage.scss'
import AddModal from '../Customs/AddModal/AddModal';


const TaskPage = () => {
    
  const [open, setopen] = useState(false);


    return (
        <React.Fragment>
          <div className='tk-con'>
            <div className='tk-div tk-div-all'>
                <Link to='/alltasks' className='tk-Link'>Explore all tasks</Link>
            </div>
            <div className='tk-div tk-div-add'>
                <div onClick={()=>setopen(previousState=>!previousState)}>Add a task</div>
            </div>
          </div>
          {open ===true ? <AddModal closeHandler={setopen} httpMethod='POST'/> : null}
        </React.Fragment>
    )
}


export default TaskPage
