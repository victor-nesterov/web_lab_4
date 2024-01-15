var express = require('express');

var app = express();
var server = app.listen(5500);

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

const savedList = [];

io.sockets.on('connection', newConnecion);

function newConnecion(socket) {
    console.log('new connection: ' + socket.id);

    socket.emit('sendList', savedList);

    socket.on('updateListFromClient', UpdateClients);

    function UpdateClients(serializedList){
        savedList.length = 0;
        savedList.push(...serializedList);
        io.emit('updateList', savedList);
    }
    
}


