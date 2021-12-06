import axios from 'axios';
import {React, useState} from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  const click_off = () => {
    axios.get('http://localhost:8080/off');
  }
  const click_on = () => {
    axios.get('http://localhost:8080/on');
  }

  return (
    <div className="App">
      <button onClick={click_off}>off</button>
      <button onClick={click_on}>on</button>
    </div>
  );
}

export default App;
