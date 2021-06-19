import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import CustomButton from '../CustomButton/CustomButton'
import Dropdown from '../Dropdown/Dropdown'
import {timeInputList} from '../../Constants';
import './AddModal.scss'
import {getTaskDetails} from '../../Redux/TaskReducer/TaskAction'


const AddModal = ({currentUser,closeHandler,team,task,getTaskDetails,httpMethod,handlerType}) => {

    const assin_userList=team.data.filter(x=>x.user_status === 'accepted');
    const [taskData, settaskData] = useState({
        desc:'',
        date: '',
        time: 0,
        assignedUser:'',
        isCompleted: 0
    })
    const [timelabel, settimelabel] = useState('Time')

    const selectHandler=(event)=>{
        let time = event.target.innerText;
        settimelabel(time);
        settaskData({...taskData, time: time} )
    }

    const changeHandler=(event)=>{
        settaskData({...taskData, [event.target.name] : event.target.value});
    }

    const TaskSubmitHandler=(event)=>{
        event.preventDefault();

        if(taskData.time === 0 || taskData.assignedUser==='')
            return;    

        //Convert time to Seconds
        var time = taskData.time;
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var dayOrNyt = time.match(/\s(.*)$/)[1];
        if(dayOrNyt === "PM" && hours<12) hours = hours+12;
        if(dayOrNyt === "AM" && hours===12) hours=0;
        var timeInSeconds = hours * 3600 + minutes*60;

        var postFetchUrl='';
        
        if(httpMethod==='PUT')
            postFetchUrl= 'https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/' +task.id;
        else
            postFetchUrl= 'https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38'; 

        //Add task using POSTorPUT method            
        fetch(postFetchUrl,
        {
            method: httpMethod,
            headers : {
                'Authorization': 'Bearer ' + currentUser.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',          
              },
            body :JSON.stringify({
                assigned_user:  taskData.assignedUser, 
                task_date: taskData.date,
                task_time: timeInSeconds,
                is_completed: taskData.isCompleted,
		        time_zone: new Date().getTimezoneOffset(),
                task_msg: taskData.desc
               })
        }).then(response=>response.json()).then(data=>{
                if(data.status==='success' && data.message==='Updated successfully'){
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
              }
        )

        closeHandler(previousState=>!previousState);
        alert(`Successfully ${httpMethod==='PUT'? 'updated' : 'added'} the task`);
    }

    useEffect(() => {

        console.log(handlerType)
        if(task !== null && task !== undefined)
        {

            //Getting assigned User by Name
            var agn_user='';
            agn_user= team.data.find(x=>x.id === task.assigned_user);
            if(agn_user ===null || agn_user === undefined)
                agn_user=task.assigned_user;
            else
                agn_user=agn_user.name

            var arr= document.getElementById("assignedUser").getElementsByTagName('option');
            var count=-1;
            for(var x=0; x < arr.length; x++){
                
                if(arr[x].innerText === agn_user)
                {
                    count=x;
                    break;
                }
                
            }
            document.getElementById("assignedUser").selectedIndex = count ===-1 ? '0' : count ;

            //convert seconds to time
            var time= task.task_time;
            var hrs= Math.floor(time/3600);
            var mins= time%60;
            if(mins>= 15 && mins <= 45 ){mins=30}else{mins=0}
            var DayorNyt='';
            if(hrs >12) {hrs=hrs-12; DayorNyt='PM';}else{DayorNyt='AM'}
            if(mins ===0 ) { mins='0'+ mins}
            if(hrs <10){hrs='0'+ hrs}

            var finalTime= hrs +':'+ mins + ' ' + DayorNyt;
            settaskData({
                    desc: task.task_msg,
                    date: task.task_date,
                    time: finalTime,
                    assignedUser:agn_user,
                    isCompleted: task.is_completed
            });
            settimelabel(finalTime);

        }
    }, [])

    return ReactDOM.createPortal(
        <React.Fragment>
            <div className='addtk-bg-container'>
                <div className='addtk-container'>
                    <div className='addtk-hd'>
                      <p>TASKS</p>
                      <span onClick={()=>closeHandler(previousState=>!previousState)}>x</span>
                    </div>
                    <form className='addtk-body-container' onSubmit={TaskSubmitHandler}>
                        <div className='input-div'>
                            <span>Text Description</span>
                            <input type='text' required value={taskData.desc} name='desc'
                                disabled= {handlerType}
                                onChange={changeHandler}/>
                        </div>

                        <div style={{display:'flex'}}>
                            <div className='input-div input-div2' style={{marginRight:'1rem'}}>
                                <span>Date</span>
                                <input type='date' disabled= {handlerType } max="9999-12-31" value={taskData.date} placeholder="YYYY-MM-DD" name='date' onChange={changeHandler}  required/>
                            </div>
                            <div className='input-div input-div2'>
                                <span>Time</span>
                                <Dropdown label={timelabel}  handlerType={handlerType } selectHandler={selectHandler} iconName='clock' selectList={timeInputList}/>
                            </div>
                        </div>

                        <div className='input-div'>
                            <span>Assign User</span>
                            <select name='assignedUser' disabled= {handlerType } id='assignedUser' onChange={changeHandler}>
                                <option value=''>--please select an option--</option>
                                {
                                    assin_userList.map((t)=>(
                                        
                                        <option name={t.name} value={t.user_id}>{t.name}</option>
                                        
                                    ))
                                    
                                }
                            </select>
                        </div>

                        <div style={{display:'flex',justifyContent:'flex-end',margin:'2rem 0rem 0 1rem'}}>
                            <CustomButton name='Cancel' style={{backgroundColor:'transparent',color:'black', borderColor:'black', borderRadius:'5px'}} 
                                clickHandler={()=>closeHandler(previousState=>!previousState)}
                            />
                            {
                            
                            handlerType === true ?  null :
                            <CustomButton name='Save' style={{marginRight:'0',backgroundColor:'#149c3b', border:'none', borderRadius:'5px' }}
                            />
                                
                            }
                        </div>
                    </form>  
            </div>
            </div>
            
        </React.Fragment>, document.getElementById('modal')
    )
}
const mapsStateToProps= state =>({
    currentUser: state.user.currentUser,
    team: state.team.teamDetails,
})
const mapDispatchToProps= dispatch =>({

    getTaskDetails: tasks=> dispatch(getTaskDetails(tasks))
})

export default connect(mapsStateToProps,mapDispatchToProps)(AddModal);
