const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(3000);
console.log('chat server is listening on port 3000');
app.use('/', require('./routes'));