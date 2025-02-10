const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");
// Create a connection to the database
const connection = mysql.createConnection({
 host: dbConfig.HOST,
 user: dbConfig.USER,
 password: dbConfig.PASSWORD,
 database: dbConfig.DB
});
// open the MySQL connection
connection.connect(error => {
 if (error) throw error;
 connection.query("DROP TABLE IF EXISTS usuarios");
 connection.query("CREATE TABLE usuarios(ID INTEGER AUTO_INCREMENT, EMAIL VARCHAR(255), NAME VARCHAR(255), PASSWORD VARCHAR(255))");
 connection.query('INSERT INTO usuarios VALUES ("CORREO@CORREO.COM", "NOMBRE", "CONTRASEÑA")');
 console.log("Conectado correctamente a la bbdd:" + dbConfig.DB);
});
module.exports = connection;