import React,{useState} from 'react'
import {connect} from 'react-redux';
import {setCurrentUser} from '../Redux/UserReducer/userAction'
import {setTeamDetails} from '../Redux/TeamReducer/TeamAction'
import CustomButton from '../Customs/CustomButton/CustomButton'
import './Loginpage.scss'
import {useHistory} from 'react-router'


const Loginpage = ({setCurrentUser,setTeamDetails}) => {

    let history = useHistory();
    const [userData, setuserData] = useState({email:'',
                                              password:''});

    const FormCloseHandler=()=>{
        history.push('/home');
    }

    const SigninHandler=(event)=>{

        event.preventDefault();

        fetch('https://stage.api.sloovi.com/login',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',          
              },
              body:JSON.stringify(userData)}).then(response=>response.json())
              .then(data=>{                  
                if(data.status === 'success'){

                    localStorage.setItem('currentUser',JSON.stringify({...userData, loginStatus:true, token: data.results.token}));
                    setCurrentUser({...userData, loginStatus:true, token: data.results.token});
                    
                    fetch('https://stage.api.sloovi.com/team',{
                        method:'GET',
                        headers : {
                          'Authorization': 'Bearer ' + data.results.token,
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',          
                        }
                      }).then(res=>res.json()).then(d=>{
                        setTeamDetails(d.results)})


                }
                })
    }

    return (
        <React.Fragment>
            <div className='lg-container'>
                <form className='lg-form-container' onSubmit={SigninHandler}>
                    <div className='lg-form-close' onClick={FormCloseHandler}>x</div>
                    <span>LOGIN</span>
                    <div className='input-containter'>
                        <div className='input-logo'>
                        <i className="fa fa-user"></i>
                        </div>
                        <input type='email' required placeholder='Email Address'onChange={(event)=>setuserData({ ...userData, email: event.target.value})}/>
                    </div>
                    <div>
                    <div className='input-containter'>
                        <div className='input-logo'>
                            <i className="fa fa-key"></i>
                        </div>
                        <input type='password' required placeholder='password' onChange={(event)=>setuserData({ ...userData, password: event.target.value})}/>
                        </div>
                    </div>
                    <CustomButton name='SIGN-IN'
                        style={{minWidth: '300px',marginTop:'1rem'}}
                    />
                </form>
            </div>
        </React.Fragment>
    )
}

const mapDispatchToProps= dispatch =>({

    setCurrentUser : user => dispatch(setCurrentUser(user)),
    setTeamDetails : teamDetails => dispatch(setTeamDetails(teamDetails))
})
export default connect(null,mapDispatchToProps)(Loginpage)
