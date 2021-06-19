import React from 'react';
import './CustomButton.scss';

const CustomButton = ({name,style,clickHandler}) => {
    return (
        <React.Fragment>
            <button  style={style} className='btn' type='submit' onClick={clickHandler}>
                {name}
            </button>
        </React.Fragment>
    )
}

export default CustomButton
