var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports  = function(){
    var app = express();

    //Recursos staticos
    app.use(express.static('./app/public'));
    //Motor de view
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //req -> middlewareBodyParser -> middlewareAuth -> funcao para tratar os dados
    //form post req.body;
    app.use(bodyParser.urlencoded({extended: true}));
    //Receber dados a partir de JSON's
    app.use(bodyParser.json());
    app.use(expressValidator());

    //Dependencias e Path das dependencias
    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);

    app.use(function(req,res,next){
        res.status(404).render('errors/404');
    });

    app.use(function(error,req,res,next){
        if(process.env.NODE_ENV == 'production'){
            res.status(500).render('errors/500');
            return;
        }
        next();

    });



    return app;
}
