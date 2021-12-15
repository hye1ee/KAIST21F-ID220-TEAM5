import {React} from 'react';
import logo from '../images/SVG/logo.svg';

function Home(props) {
  props.setCurrent('home');
 
  return (
    <div>
        <p>HOME</p>
    </div>
  );
}

export default Home;
