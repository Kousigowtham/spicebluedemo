import React,{useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import './Header.scss';
import CustomButton from '../Customs/CustomButton/CustomButton';
import {connect } from 'react-redux';
import {setCurrentUser,setCurrentUserDetails} from '../Redux/UserReducer/userAction'
import {setTeamDetails} from '../Redux/TeamReducer/TeamAction'


const Header = ({setCurrentUser,currentUser,setTeamDetails,setCurrentUserDetails}) => {

const [menu, setmenu] = useState(false);
let history= useHistory();

const LoginHandler= ()=>{
    history.push('/login')
}
const LogoutHandler=()=>{
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setCurrentUserDetails(null);
    setTeamDetails(null);
}
    return (
        <React.Fragment>
            <header className='hd-container'>
                <div className='hd-logo'>
                    <span>DEMO</span>
                </div>
                <div className='hd-hide'>
                <Link className='hd-link' to='/home'><i title='Home' className="fa fa-home"></i></Link>
                <Link className='hd-link' to='/tasks'><i title='Tasks'className="fa fa-tasks"></i></Link>
                <Link className='hd-link'><i title='Contact'className="fa fa-address-card"></i></Link>
                </div>
                <div className='hd-menu hd-link' onClick={()=>setmenu(previousState=>!previousState)}>
                    { menu ===true ? <i title='close the menu' class="fas fa-times"></i> :
                    <i title='Menu' className="fas fa-bars "></i> }
                </div>
                <div style={{marginRight:'1rem'}}>
                {   currentUser === null ? 
                    <CustomButton className='hd-login' name='Login' clickHandler={LoginHandler}/> :
                    <CustomButton className='hd-login' name='Signout' clickHandler={LogoutHandler}/>
                }
                </div>
            </header>
            { menu ===true ?
            <div className='fullheader'>
                    <Link className='hd-link' onClick={()=>setmenu(previousState=>!previousState)} to='/home'><i title='Home' className="fa fa-home"></i></Link>
                    <Link className='hd-link' onClick={()=>setmenu(previousState=>!previousState)} to='/tasks'><i title='Tasks'className="fa fa-tasks"></i></Link>
                    <Link className='hd-link' onClick={()=>setmenu(previousState=>!previousState)}><i title='Contact'className="fa fa-address-card"></i></Link>
                    </div> : null }
        </React.Fragment>
    )
}


const mapDispatchToProps= dispatch =>({
    setCurrentUser : user=> dispatch(setCurrentUser(user)),
    setCurrentUserDetails : userDetails=> dispatch(setCurrentUserDetails(userDetails)),
    setTeamDetails : teamDetails => dispatch(setTeamDetails(teamDetails))
})

const mapsStateToProps= state=>({
    currentUser: state.user.currentUser,
})
export default connect(mapsStateToProps,mapDispatchToProps)(Header)
