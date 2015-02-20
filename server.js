var app = require('express')();
var http = require('http');
var request = require('request');
var server = http.Server(app);
var io = require('socket.io')(server);
var port = 1337;
var score = 0;
var activity = {id: 1279983, userScore: score.toString() + '%'};

io.on('connection', function (socket) {

  socket.on('disconnect', function () {
    clearInterval(interval);
  });

  var period = 200,
      interval = setInterval(function () {
        score = Math.random() * 100;
        activity.userScore = score.toString() + '%';
        socket.emit('activity', activity);
      }, period);
});

server.listen(port, function () {
  console.log('listening on *:' + port);
});
