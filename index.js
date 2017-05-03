var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    if(msg.includes("find me")){

      var messageContents = msg.replace("find me ","");

      io.emit('chat message user', msg);
      io.emit('chat message system',"Looking for: " + messageContents );

      io.emit('PI Tag', " " + messageContents + " VALUE : X");
    }
    else {

      io.emit('chat message user', msg);
    }
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
