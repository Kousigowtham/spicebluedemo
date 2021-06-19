import React,{useState} from 'react'
import './Dropdown.scss'

const Dropdown = ({label, selectList,iconName,selectHandler,handlerType=false}) => {

    const [show, setshow] = useState(false)

    return (
        <React.Fragment>
            <div className='dd-container'  style={handlerType ===true ?{pointerEvents: 'none'} : null} onClick={()=>setshow(previousState=>!previousState)}>
                <div className='dd-box' style={handlerType ===true ?{backgroundColor:'rgba(0,0,0,0.1)'} : null}>
                    <i className={`fa fa-${iconName}`}></i>
                    <span>{label}</span>
                </div>
                <div className='dd-list' style={show===true ? {display: 'flex'} : null}>
                    {
                        selectList.map((option)=>(
                            <span onClick={(event)=>selectHandler(event)} value={option}>{option}</span>
                        ))
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dropdown
