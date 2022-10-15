import mysql from "mysql2/promise";
console.log("Creating connection db...");

const db = mysql.createPool({
  host: "139.180.186.20",
  user: "t2204m",
  password: "t2204m123",
  database: "t2204m",
  port: 3306,

  // host: "localhost",
  // user: "root",
  // database: "t2204m",
  // port: 3306,
});

export default db;
