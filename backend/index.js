// import express and serialport
const express = require('express');
const bodyParser = require('body-parser');
const yogurtRouter = require('./yogurt_router.js');

const mongoose = require('mongoose');

const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline');

const serial_port = new SerialPort('COM7',{baudRate : 115200});
const parser = serial_port.pipe(new ReadLine({delimiter : '\n'}));

const app = express();
const port = 8080;

mongoose.connect('mongodb://localhost:27017/yogurt',{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.once('open', function(){
    console.log('DB connected');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}))

app.use('/yogurt', yogurtRouter);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/:action', (req, res)=>{
    const action = req.params.action;
    serial_port.write(action);
    res.send(`action : ${action} completed`);
})


// open server and serial port
app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
})
serial_port.on('open',()=>{
    console.log('Serial port opened!');
});