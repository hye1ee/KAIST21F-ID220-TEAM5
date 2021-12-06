// import express and serialport
const express = require('express');
const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline');

const serial_port = new SerialPort('COM7',{baudRate : 115200});
const parser = serial_port.pipe(new ReadLine({delimiter : '\n'}));

const app = express();
const port = 8080;

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
    console.log(`Example app listening at http://localhost:${port}`)
})
serial_port.on('open',()=>{
    console.log('Serial port opened!');
});