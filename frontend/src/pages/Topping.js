import './page_style.css';
import {React, useState, useEffect} from 'react';
import axios from 'axios';

function Topping(props){

    const [topping, setTopping] = useState([[],[],[],[],[],[]]);
    const [reload, setReload] = useState(false);

    let data =[];
    const newtopping = [[],[],[],[],[],[]];
    
    // refill the topping to fullstate
    const fill = (order) =>{
        axios.get(`/yogurt/topping/update/${order}/10`)
        .then(()=>{
            console.log(`success fill the topping ${order}`);
            setReload(true);
        });

    }

    useEffect(()=>{
        axios.get('/yogurt/topping')
        .then(response=>{
            console.log('success get all topping');
            data = [...response.data];
            console.log(data);

            for(let i=0 ; i<data.length ; i++){
                newtopping[parseInt(data[i].order)-1] = [data[i].name, data[i].amount];
            }
            setTopping(newtopping);
            setReload(false);
        });
    },[props.reload, reload]);


    return(
        <div className="topping_box">
            <div className="topping_top">
                <div className="topping_amount">
                    {topping.map((item, idx)=>{
                        const amount = item[1]*10;
                        const warning = amount<=30;

                        if(props.setting){
                            return(
                                <div className= "amount_item setting" key={idx}>
                                    <div className={`amount_text ${warning}`} onClick={()=>fill(parseInt(idx)+1)}>{amount}</div>
                                </div>
                            );
                        }else{

                            return(
                                <div className="amount_item" key={idx}>
                                    <div className={`amount_text ${warning}`}>{amount}</div>
                                </div>
                            );

                        }
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

    );
}

export default Topping;
