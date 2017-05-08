module.exports = function(app){
    app.get("/produtos",function(req,res,next){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err, results){
            if(err){
                return next(err);
            }

            res.format({
                html: function(){
                    res.render("produtos/lista", {lista: results});
                },
                json: function(){
                    res.json(results);
                }
            });
        });
        connection.end();
    });

    app.get("/produtos/form", function(req, res){
        res.render("produtos/form", {errosValidacao: {}, produto:{}});
    });

    app.post("/produtos", function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        var produto = req.body;

        //Express validator
        req.assert('titulo', 'Titulo eh obrigatorio').notEmpty();
        req.assert('preco', 'Formato invalido').isFloat();
        var errors = req.validationErrors();

        if(errors){
            res.format({
                html: function(){
                    res.status(400).render('produtos/form', {errosValidacao: errors, produto:produto});
                },
                json: function(){
                    res.status(400).send(errors);
                }
            });
            return;
        }

        produtosDAO.salva(produto,function(err, results){
            //Always Redirect After POST
            res.redirect('/produtos');
        });
    });
}
