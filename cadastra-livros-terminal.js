var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port:3000,
    path:'/produtos',
    method: 'POST',
    headers: {
        //Receber os dados
        'Accept' : 'application/json',
        //Enviar os dados
        'Content-type' : 'application/json'
    }
};


var client = http.request(configuracoes, function(res){
    console.log(res.statusCode);
    //Quando os dados da requisição estiver pronto
    res.on('data', function(body){
        console.log("Corpo" + body);
    });
});

var produto = {
    titulo: 'Mais sobre NodeJS',
    descricao: 'Node, JAVASCRIPT e um pouco sobre HTTP',
    preco: 100.00
};



//Dispara a requisição
client.end(JSON.stringify(produto));
