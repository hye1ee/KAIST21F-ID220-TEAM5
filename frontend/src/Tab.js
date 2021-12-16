import {React} from 'react';
import './style.css';
import logo from './images/SVG/logo.svg';
import Button from './Button.js';

function Tab(props) {
 

    return (
        <div className="tab_box">
            <img className="tab_image" src={logo}/>
            <Button name='HOME' link='/' current={props.current==='home'}/>
            <Button name='MENU' link='/menu' current={props.current==='menu'}/>
    
            <Button name='SETTING' link='/setting' current={props.current==='setting'}/>
            <div className="tab_image"></div>
        </div>
    );
}

export default Tab;
