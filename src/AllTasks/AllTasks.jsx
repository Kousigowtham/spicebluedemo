import React,{useEffect,useCallback} from 'react'
import './AllTasks.scss'
import {connect} from 'react-redux';
import {getTaskDetails} from '../Redux/TaskReducer/TaskAction'
import Customcard from '../Customs/CustomCard/Customcard'
import { useHistory } from 'react-router';

const AllTasks = ({tasks,currentUser,getTaskDetails}) => {

  let history=useHistory();

  const DeleteHandler=(task)=>{
    let isDeleted = window.confirm('Are you sure to delete this task?');
    var taskName = task.task_msg;
    if(isDeleted){
        fetch('https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/' + task.id,{
            method : 'DELETE',
            headers : {
            'Authorization': 'Bearer ' + currentUser.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
          }
        }).then(response=> response.json()).then(data=> {
          if(data.status==='success' && data.message==='Deleted successfully'){
            fetch('https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38',{
              method:'GET',
              headers : {
                  'Authorization': 'Bearer ' + currentUser.token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',          
                }
          }).then(response=>response.json()).then(data=>{
              getTaskDetails(data.results)
          })

          }
        })
        
        alert(`SuccessFully Deleted task--> ${taskName}`);
    }
}

const fetchLead= useCallback(
  () => {
    fetch('https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38',{
            method:'GET',
            headers : {
                'Authorization': 'Bearer ' + currentUser.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',          
              }
        }).then(response=>response.json()).then(data=>{
            getTaskDetails(data.results)
        })
  },[getTaskDetails,currentUser])

const GoBackLogin = useCallback(
  () => {
    history.push('/login')
  },
  [history])

    useEffect(()=>{
        
      if(currentUser === null || currentUser === undefined)
          GoBackLogin();

        if(currentUser !== null )
        {
          fetchLead();
    }
    },[fetchLead,currentUser,GoBackLogin])
 


    return (
        <React.Fragment>
          { currentUser !== null ? 
            <div className='tks-container'>
               { tasks !== null ? (
                   tasks.map( (task,index) => (
                        <Customcard task={task} DeleteHandler={DeleteHandler} index={index}/>
               )))
             : null
            }
            </div> :

        <div className='noRec-container'>
            <p>No records...</p>
        </div>
}
        </React.Fragment>
    )
}

const mapsStateToProps= state=>({
    currentUser: state.user.currentUser,
    tasks: state.tasks.taskDetails
})

  
  const mapDispatchToProps = dispatch=>({
  
    getTaskDetails : taskDetails => dispatch(getTaskDetails(taskDetails))
  
  })


export default connect(mapsStateToProps,mapDispatchToProps)(AllTasks)
