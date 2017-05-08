var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port:3000,
    path:'/produtos',
    headers: {
        //Receber os dados
        'Accept' : 'application/json',
    }
};

http.get(configuracoes, function(res){
    console.log(res.statusCode);
    //Quando os dados da requisição estiver pronto
    res.on('data', function(body){
        console.log("Corpo" + body);
    });
});
