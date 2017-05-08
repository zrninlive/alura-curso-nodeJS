var mysql = require('mysql');

function createDbConnection(){
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'node_js'
        });
    }

    if(process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'node_js_test'
        });
    }

    if(process.env.NODE_ENV == 'production'){
        // esconder os dados do banco
        var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
        var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*):@(.*)\/(.*)\?reconnect=true/);

        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'node_js_test'
        });
    }
}

//Wraper
module.exports = function(){
    return createDbConnection;
}
