/*
 * @Author: liu.jiahuan 
 * @Date: 2018-04-02 13:44:59 
 * @Last Modified by: liu.jiahuan
 * @Last Modified time: 2018-04-02 18:16:06
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')
var moment = require('moment')

var clientIp = null;

app.get('/', function(req, res){
  res.redirect('/chat.html');
});

app.use('/', express.static(path.join(__dirname,'./public')));

var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    console.log('a user connected');
    // socket.emit('chat message', {
    //     that: 'only'
    //   , '/chat': 'will get'
    // });
    // chat.emit('chat message', {
    //     everyone: 'in'
    //   , '/chat': 'will get'
    // });

    socket.on('chat message', function(msg){
      // socket.emit('chat message', msg);
      
      var address = socket.handshake.address
      var time = moment(socket.handshake.time).format('YYYY-MM-DD HH:mm:ss')
      chat.emit('chat message', {
        msg,
        address,
        time
      });
    });
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    // socket.on('hi!', function() {
    // 	console.log('hi!')
    // });
  });

var news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });
  
http.listen(3000, function(){
  console.log('listening on *:3000');
});

