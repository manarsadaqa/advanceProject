require('dotenv').config({path:"./env/.env"});
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
     waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
