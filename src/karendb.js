const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1996',
    database: 'karen',
});

mysqlConnection.connect(function (err,){
    if(err) {
        console.error(err);
        return
    } else {
        console.log('base de datos conectada');
    }
});

module.exports = mysqlConnection;