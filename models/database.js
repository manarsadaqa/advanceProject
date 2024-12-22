const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DB_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
});
 
module.exports = pool;
 