import React,{useEffect,useCallback} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Header from './Header/Header';
import Loginpage from './Loginpage/Loginpage';
import AllTasks from './AllTasks/AllTasks';
import {connect } from 'react-redux';
import {setCurrentUser,setCurrentUserDetails} from './Redux/UserReducer/userAction'
import {setTeamDetails} from './Redux/TeamReducer/TeamAction'
import TaskPage from './Taskpage/TaskPage';

function App({setCurrentUser,setCurrentUserDetails,setTeamDetails,currentUser}) {



const fetchCurrentuser =useCallback(
  (userData) => {
    setCurrentUser(userData);
  fetch('https://stage.api.sloovi.com/user',{
    method:'GET',
    headers : {
        'Authorization': 'Bearer ' + userData.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',          
      }
}).then(response=>response.json()).then(data=>{
  setCurrentUserDetails(data.results)
})
  },[setCurrentUser,setCurrentUserDetails])


const fetchTeam = useCallback(
  (userData) => {
    fetch('https://stage.api.sloovi.com/team',{
  method:'GET',
  headers : {
    'Authorization': 'Bearer ' + userData.token,
    'Accept': 'application/json',
    'Content-Type': 'application/json',          
  }
}).then(response=>response.json()).then(data=>{
  setTeamDetails(data.results)
  console.log(data.results)
})
  },[setTeamDetails])

useEffect(() => {

  let userData = JSON.parse(localStorage.getItem('currentUser'));
  if(userData !== null && currentUser ===null )
  {
  
    fetchCurrentuser(userData);
    fetchTeam(userData);

  }
}, [currentUser,fetchTeam,fetchCurrentuser])

  return (
      <React.Fragment>
        <Header/>
        <Switch>
          <Route  exact path='/' component={Homepage}  />
          <Route  exact path='/home' component={Homepage}  />
          <Route  exact path='/alltasks' component={AllTasks}  />
          <Route  exact path='/login' component={Loginpage}>
            {currentUser !=null ? <Redirect to='/home'/>: <Loginpage/>}
          </Route>
          <Route  exact path='/tasks' component={TaskPage}>
            {currentUser  === null ? <Redirect to='/login'/> : <TaskPage/>}
          </Route>
        </Switch>
      </React.Fragment>


  );
}

const mapsStateToProps = state =>({
  currentUser : state.user.currentUser
})

const mapDispatchToProps = dispatch=>({

  setCurrentUser : user=> dispatch(setCurrentUser(user)),
  setCurrentUserDetails : userDetails=> dispatch(setCurrentUserDetails(userDetails)),
  setTeamDetails : teamDetails => dispatch(setTeamDetails(teamDetails))

})

export default connect(mapsStateToProps,mapDispatchToProps)(App);
