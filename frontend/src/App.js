import {React, useState} from 'react';
import './style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home.js'
import Menu from './pages/Menu.js'
import Record from './pages/Record.js'
import Setting from './pages/Setting.js'

import Tab from './Tab.js'
import Profile from './Profile.js'

function App() {
  const [user, setUser] = useState(0);
  const [current, setCurrent] = useState('home');
  return (
    <BrowserRouter>
      <div className="main_page">
        
        <Tab className="main_tab" current={current}/>
        <div className="main_content">
            <Routes>
              <Route exact path='/' element={<Home setCurrent={setCurrent}/>} />
              <Route exact path='/menu' element={<Menu setCurrent={setCurrent}/>} />
              <Route exact path='/record' element={<Record setCurrent={setCurrent}/>} />
              <Route exact path='/setting' element={<Setting setuser={setUser} setCurrent={setCurrent}/>} />
            </Routes> 
        </div>
        <Profile className="main_profile" user={user}/>
        
      </div>
    </BrowserRouter>

  );
}

export default App;
