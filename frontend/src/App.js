import axios from 'axios';
import {React, useState} from 'react';
import './App.css';
import Speech from './speech.js';

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

  //<button onClick={click_off}>off</button>
  //<button onClick={click_on}>on</button>
  return (
    <div className="App">
      <Speech />
    </div>
  );
}

export default App;
