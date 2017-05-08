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
}

//Wraper
module.exports = function(){
    return createDbConnection;
}
