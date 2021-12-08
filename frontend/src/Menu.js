import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './style.css';


function Menu() {
    const [menulist, setMenulist] = useState([]);
    const [reload, setReload] = useState(false);
    const [menuname, setMenuName] = useState('');

    // get all menu again every reload changes
    useEffect(()=>{
        axios.get('/yogurt/menu')
        .then(response=>{
            console.log('success get all menu');
            const newmenulist = response.data;
            setMenulist(newmenulist.reverse());
            console.log(newmenulist);
        });
    },[reload]);

    const inputChange = (evt) => {
        setMenuName(evt.target.value);
    };

    const deleteMenu = (name) => {
        axios.delete('/yogurt/menu',{data :{name:name}})
        .then(()=>{
            setReload(reload=>!reload);
        });
    };

    const addMenu = () => {
        axios.post('/yogurt/menu',{name:menuname})
        .then(()=>{
            setMenuName('');
            setReload(reload=>!reload);
        });
    };

    return(
        <div className="menu_block">
            <div className="menu_add">
                <input onChange={inputChange}/>
                <button onClick={addMenu}>ADD</button>
            </div>
            <div className="menu_list">
                {menulist.map((menu, idx)=>{
                    return(
                        <div className="menu_item" onClick={()=>deleteMenu(menu.name)} key={idx}>
                            <div className="menu_name">
                                {menu.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    );

}
export default Menu;