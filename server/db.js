import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",          
  password: "potato",//"7927", 
  database: "mydb",
  port: 3306
});

export default db;