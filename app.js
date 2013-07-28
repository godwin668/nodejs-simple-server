var static = require('node-static');
var fileServer = new static.Server('./assets');
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var webRTC = require('webrtc.io').listen(io);

function handler (req, res) {
  req.addListener('end', function () {
    console.log('incomming....');
    fileServer.serve(req, res);
  }).resume();
}

// Delete this row if you want to see debug messages
// io.set('log level', 1);

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {

  // Start listening for mouse move events
  socket.on('mousemove', function (data) {

    // This line sends the event (broadcasts it)
    // to everyone except the originating client.
    socket.broadcast.emit('moving', data);
    // socket.emit('news', { hello: 'world' });
    console.log('client mousemoming: ' + JSON.stringify(data));
  });

});

app.listen(8081);
