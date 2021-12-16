import {React} from 'react';
import Topping from './Topping.js';

function Setting(props) {
  props.setCurrent('setting');

  return (
  <div className = "page">
      <div className = "header setting_header">
        <div className="big home_text">Topping Refill</div>
        <div className="middle home_text">Click the topping</div>
      </div>
      <br/>
      <br/>
      <Topping className = "topping" setting={true} />
      <br/>
      <br/>
      <br/>
      <br/>
  </div>
  );
}

export default Setting;
