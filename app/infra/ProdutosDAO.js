function ProdutosDAO(connection){
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback){
    this._connection.query('select * from produtos', callback);
}

ProdutosDAO.prototype.salva = function(produto,callback){
    //set ? = jso chave valor para os campos do banco
    this._connection.query('insert into produtos set ?',produto,callback);
}

module.exports = function(){
    return ProdutosDAO;
}
