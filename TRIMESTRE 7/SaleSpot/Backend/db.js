const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0516',
  database: 'salespot',
});

module.exports = connection;
