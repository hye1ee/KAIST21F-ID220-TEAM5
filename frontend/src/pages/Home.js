import {React, useState, useEffect} from 'react';
import './page_style.css';
import Speech from './Speech.js';
import Topping from './Topping.js';
import axios from 'axios';

function Home(props) {
  props.setCurrent('home');
  
  const [text, setText] = useState('Press the joystick');
  const [reload, setReload] = useState(false);

  useEffect(()=>{
    setReload(false);
  },[reload]);

  return (
    <div className = "page">
        <div className = "header">
          <div className="big home_text">{`Order with\nYour Voice`}</div>
          <div className="middle home_text">{text}</div>
        </div>
        <div className = "home_order">
          <Speech setText={setText} setReload={setReload}/>
        </div>
        <div className = "home_topping">
          <div className="normal home_text">Current Topping Level</div>
          <div className="small home_text">Refill on the Setting Tab</div>
          <div className="topping">
            <Topping  reload={reload} setting={false} />
          </div>
          
        </div>
    </div>
  );
}

export default Home;
