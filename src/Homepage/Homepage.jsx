import React from 'react'
import './Homepage.scss'
import CustomButton from '../Customs/CustomButton/CustomButton'
import { useHistory } from 'react-router'
const Homepage = () => {

    const history = useHistory();
    const homeHandler=()=>{
        history.push('/alltasks');
    }
    return (
        <React.Fragment>
            <div className='bdy-bg'>
                <div className='bdy-bg2'>
                    <div className='bdy-container'>
                        <p>Explore the registered <span>T</span>asks now 
                        <CustomButton clickHandler={homeHandler} style={{padding:'1rem 4rem', backgroundColor:'transparent', fontSize:'1.1rem',letterSpacing:'0.1rem',borderColor:'white'}} name='Take a Follow up'/>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Homepage
