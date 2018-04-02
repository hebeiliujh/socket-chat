/*
 * @Author: liu.jiahuan 
 * @Date: 2018-04-02 13:27:13 
 * @Last Modified by: liu.jiahuan
 * @Last Modified time: 2018-04-02 18:17:32
 */

$(function () {
  // var socket = io();
  var host = 'http://192.168.9.125:3000';
  // host = 'http://127.0.0.1:3000'
  var chat = io.connect(host + '/chat')
  , news = io.connect(host + '/news');
  $('form').submit(function(e){
    chat.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  chat.on('chat message', function({msg, address, time}) {
    $('#messages').append($('<li>').html('<div>(' + address + ' - ' + time + '): ' + msg + '</div>'));
    window.scrollTo(0, document.body.scrollHeight);
  });

  news.on('news', function () {
    news.emit('woot');
  });
});
