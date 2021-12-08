import axios from 'axios';
import {React, useState} from 'react';
import './style.css';
import Speech from './Speech.js';
import Menu from './Menu.js'

function App() {
  const [message, setMessage] = useState('');

  const click_off = () => {
    axios.get('http://localhost:8080/off');
  }
  const click_on = () => {
    axios.get('http://localhost:8080/on');
  }

  const handlemessage = () =>{
    console.log('try');
    if(message === true){
      setMessage(false);
    }else{
      setMessage(true);
    }
  }

  const postmenu = (name) => {
    axios.post('/yogurt/menu',{name:name});
  }

  //<button onClick={click_off}>off</button>
  //<button onClick={click_on}>on</button>
  return (
    <div className="main_page">
      <Menu />
      <Speech />
    </div>
  );
}

export default App;
