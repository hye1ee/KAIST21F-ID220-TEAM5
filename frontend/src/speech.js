import React, {useState} from 'react'

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

    const handleListen = () => {

        mic.start();
        mic.onend = () =>{
            console.log('mic stopped');
        }
        mic.onstart = () =>{
            console.log('mic on');
        }

        mic.onresult = (event) => {
            setText(event.results[0][0].transcript);
            mic.onerror = (event) =>{
                console.log(event.error);
            }
        }
    }


    return(
        <div>
            <button onClick={handleListen}>Start</button>
            <br></br>
            {text}
        </div>
    );

}
export default Speech;