import {React, useEffect, useState} from 'react';
import axios from 'axios';
import './page_style.css';
import Menuitem from './Menuitem.js';


function Menu(props) {
    props.setCurrent('menu');
 
    const [menulist, setMenulist] = useState([]);
    const [topping, setTopping] = useState([]);
    const [reload, setReload] = useState(false);
    const [menuname, setMenuName] = useState('');
    const [menudata, setMenuData] = useState([0,0,0,0,0,0]);
    const [error, setError] = useState([false, false, false, false, false, false, false]);

    // get all menu again every reload changes
    useEffect(()=>{
        axios.get('/yogurt/menu')
        .then(response=>{
            console.log('success get all menu');
            const newmenulist = response.data;
            setMenulist(newmenulist.reverse());

            // get topping name list
            axios.get('/yogurt/topping')
            .then(response=>{
                console.log('success get all topping');
                let data = [...response.data];
                let newtopping = []
                for(let i=0 ; i<data.length ; i++){
                    newtopping[parseInt(data[i].order)-1] = [data[i].name];
                }
                setTopping(newtopping);
                setReload(false);
            });
        });
    },[reload]);

    // manage input data
    const inputChange = (evt) => {
        setMenuName(evt.target.value);
    };

    const dataChange = (evt,index) => {
        let value = parseInt(evt.target.value);
        if(value===NaN){
            let preverror = [...error];
            preverror[index] = true; 
            setError(preverror);
        }else{
            if(value>=0 & value<10){
            let prevdata = [...menudata];
            prevdata[index] = value;
            setMenuData(prevdata);

            let preverror = [...error];
            preverror[index] = false; 
            setError(preverror);
            }else{
            let preverror = [...error];
            preverror[index] = true; 
            setError(preverror);
            }
        }
    };

    const deleteMenu = (name) => {
        axios.delete('/yogurt/menu',{data :{name:name}})
        .then(()=>{
            setReload(true);
        });
    };

    const addMenu = () => {
        axios.post('/yogurt/menu',{name:menuname, data:menudata})
        .then(()=>{
            setMenuData([0,0,0,0,0,0]);
            setMenuName('');
            setReload(true);
        });
    };

    return(
        <div className="menu_page">
            <div className = "header">
                <div className="big home_text">{`Make Your\nOwn Menu`}</div>
                <div className="middle home_text">Set the value and click add button</div>
            </div>
            <div className="menu_add">
                <div className="add_box">
                    <input className="menu_input amount_text" type="text" placeholder ="name" onChange={inputChange}/>
                    <button className="menu_button amount_text" onClick={addMenu} disabled={error[0]|error[1]|error[2]|error[3]|error[4]|error[5]|error[6]|error[7]}>add</button>
                </div>

                <div className="topping_box">
                <div className="topping_top">
                    <div className="topping_amount">
                        {menudata.map((item, idx)=>{
                                return(
                                    <div className= "amount_item setting" key={idx}>
                                        <input type="text" className="topping_input amount_text" key={idx} type="text" defaultValue='0' onChange={(e)=>dataChange(e,idx)}/>
                                    </div>
                                );
                        })}
                    </div>
                </div>
                <div className="topping_bottom">
                    <div className="topping_name">
                        {topping.map((item, idx)=>{
                                    return(
                                        <div className="name_item" key={idx}>
                                            <div className="name_text" >{item[0]}</div>
                                        </div>
                                    );

                            })}
                    </div>
                </div>
                </div>
                
            </div>

            <br/>
            <br/>
            <div className = "header">
                <div className="big home_text">Menu List</div>
                <div className="middle home_text">Click to delete</div>
            </div>
            <div className="menu_list">
                {menulist.map((menu, idx)=>{
                    return(
                        <div className="menu_item" onClick={()=>deleteMenu(menu.name)}>
                            <Menuitem  name={menu.name} data={menu.data} key={idx}/>
                        </div>
                    );
                })}
            </div>
            <br/>
            <br/>
        </div>

    );
}

export default Menu;
