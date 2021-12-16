import React from 'react'
import './page_style.css'
import axios from 'axios'
import symbol from '../images/SVG/symbol.svg'

// basic settings for using speech recognition API
// runs well on chrome & *edge
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

// *interimResults
// true will show recognized data in real-time
// false will show recognized data after recognition
mic.interimResults = true;

// *continuous
// true makes all recognized data into one sentence
// false distinguish the sentence and automatically stop recognition
mic.continuous = false;

mic.lang = 'en-US';

function Speech(props) {

    const checkOrder = (order) => {
        if(order.length===3 && order[0]==='i' && order[1]==='want'){
            axios.get(`/yogurt/menu/${order[2]}`)
            .then((result)=>{

                if(result.data===false){
                    props.setText(`Wrong Menu Name : ${order[2]}`);
                }else{ // correct menu order
                    props.setText(`Menu Ordered : ${order[2]}`);
                    const data = [...result.data.data];
                    console.log(data);
                    let message = '';

                    for(let i in data){
                        // make serial message
                        message  = message + `${data[i]},`;
                        
                        // make serial message
                        let order = parseInt(i)+1;
                        let amount = 0;
                        axios.get(`/yogurt/topping/${order}`)
                        .then(response=>{
                            console.log(`success get topping ${order}`);
                            // modify topping amount
                            console.log(response.data);
                            amount = response.data.amount-parseInt(data[i]);
                            if(amount<0){
                                amount=0;
                            }
                            console.log('order: ' +order);
                            console.log('amount : '+amount);
                            axios.get(`/yogurt/topping/update/${order}/${amount}`)
                            .then(()=>{
                                if(i==5){
                                    props.setReload(true);
                                }
                            });


                        });
                        
                    }
                    // send serial message
                    message = message + '8';
                    console.log(message);
                    axios.get(`/serial/${message}`);


                }
            });
        }else{
            props.setText("Wrong Order Message");
        }
    };

    const handleMic = () => {
        mic.start();
        mic.onstart = () =>{
            console.log('mic on');
        }

        mic.onresult = (event) => {
            mic.onend = () =>{
                console.log('mic stopped');

                let order = event.results[0][0].transcript;
                // eliminate . from order & make to lowercase & split by ' '
                checkOrder(order.replace(/\./g,'').toLowerCase().split(' '));     
            }
            mic.onerror = (event) =>{
                console.log(event.error);
            }
        }
    }


    return(
        <img className="home_image" src={symbol} onClick={handleMic}/>
    );

}
export default Speech;