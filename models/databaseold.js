const mysql  = require('mysql2');
//require('dotenv').config({path:"./env/.env"});

const pool2 = mysql.createPool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  //connectionLimit: 10
});


module.exports = pool2; 