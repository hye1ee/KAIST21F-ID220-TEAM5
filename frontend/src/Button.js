import React from 'react';
import { Link } from 'react-router-dom'
import './style.css';

function Button(props) {

    return(
        <div className="button_box">
            <Link to = {props.link} style={{textDecoration :'none'}}>
                <button className={`${props.current} button_component`}>
                    {props.name}
                </button>
            </Link>
            <div className={`${props.current} button_bar`}></div>

        </div>

        
    );

};

export default Button;