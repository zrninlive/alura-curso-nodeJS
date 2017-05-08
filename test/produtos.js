//var http = require('http');

var express = require('../config/express')();
var request = require('supertest')(express);

// Lanca uma excessao para erros
var assert = require('assert');

describe('ProdutosController', function(){
    //funcao antes de executar os testes
    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        //Limpa as tabelas antes dos testes
        conn.query("delete from produtos", function(err, result){
            if(!err){
                done();
            }
        });
    });


    //node-database-cleaner - Lib resposavel por limpar todas tabelas do banco

    it('#listagem json', function(done){
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200, done);

        // http.get(configuracoes, function(res){
        //     assert.equal(res.statusCode,200);
        //     assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        //
        //     done();
        // });
    });

    it('#cadastro de novo produto', function(done){
        request.post('/produtos')
        .send({
            titulo: "Livro do Crhistian",
            descricao: "novo livro",
            preco: 10.00
        })
        .expect(302, done);
    });

});
