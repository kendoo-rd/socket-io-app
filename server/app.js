const express = require('express')();
const ioServer = require('socket.io');

//  Start http Server at port 3000
const httpServer = express.listen(3000);

//  Start socket io server
const io = new ioServer( httpServer );

//  Socket Activity
io.on('connection', socket => {

    console.log( 'a new client connected' + socket.id);

    //  Send welcome message
    socket.emit('message', 'Welcome to our server');


    //  Send another message after 3 seconds
    setTimeout( () => {
        socket.emit('message', 'Another automated message from server');
    }, 3000)


    //  Respond to messages from client
    socket.on('messageToEveryone', data => {

        //  Send to all clients
        io.emit('message', data);
    })

    socket.on('messageToOthers', data => {

        //  Who is sending the message?
        let somebody = socket.username == undefined ? 'somebody' : socket.username;

        //  Build message content with sender name 
        let messageContent = `${somebody}: ${data}`

        //  Send to other clients
        socket.broadcast.emit('message', messageContent);
    })

    socket.on('messageMe', () => {

        //  Send to client only

        let quotes = [
            'life is beautiful',
            'let your faith be stronger than your fear',
            'keep going'
        ];

        socket.emit('message', quotes[ Math.floor(Math.random() * quotes.length) ] );
    })



    //  Further commands / messages / events

    socket.on('join', username => {
        
        socket.username = username;

        socket.broadcast.emit('message', `${socket.username} has joined`)
    })


    socket.on('objectFromClient', obj => {

        //  Who is sending the message?
        let somebody = socket.username == undefined ? 'somebody' : socket.username;

        // product.toString = () => {
        //     return product.name;
        // }
        // io.emit('newProduct', `A new producterecieved by ${somebody}: ` + product);

         //  Send to all
        io.emit('newObject', obj);
    })

})
