import React, {useState} from 'react'
import './style.css'
import axios from 'axios'

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

function Speech() {
    const [text, setText] = useState(null);

    const checkOrder = (order) => {
        if(order.length===3 && order[0]==='i' && order[1]==='want'){
            axios.get(`/yogurt/menu/${order[2]}`)
            .then((result)=>{
                

                if(result.data===false){
                    setText(`There is no menu name : ${order[2]}`);
                }else{
                    setText(`Menu Order : ${order[2]}`);
                    let message = '1,';
                    result.data.data.map((number)=>{
                        message = message + `${number},`;
                    });
                    message = message.substr(0,13);
                    console.log(message);
                    axios.get(`/serial/${message}`);

                }
            });
        }else{
            setText("Wrong Order, Please say 'I want ~' ");
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
        <div className="speech_block">
            <button onClick={handleMic}>Start</button>
            <br></br>
            {text}
        </div>
    );

}
export default Speech;