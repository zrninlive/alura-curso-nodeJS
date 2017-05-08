var app = require("./config/express")();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

//Porta para rodar o node
http.listen(3000, function(){
    console.log("Server is running");
});
