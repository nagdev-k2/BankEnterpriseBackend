const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vijay@3107',
  database: 'project_2'
})

module.exports = { connection };