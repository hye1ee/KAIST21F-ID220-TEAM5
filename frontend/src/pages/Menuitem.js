import {React} from 'react';
import './page_style.css';


function Menuitem(props) {

    return(
        <div className="menuitem_box">
            <div className="menuitem_name amount_text">
                {props.name}
            </div>
            <div className="menuitem_datalist">
                {props.data.map((value, idx)=>{
                    return(
                        <div className="menuitem_data" key={idx}>
                            <div className="menuitem_value amount_text">
                                {value}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}

export default Menuitem;
