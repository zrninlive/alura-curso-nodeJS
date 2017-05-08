var app = require("./config/express")();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

//Porta para rodar o node
var porta = process.env.PORT || 3000;
http.listen(porta, function(){
    console.log("Server is running");
});
