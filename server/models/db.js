const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectTimeout: 20000,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed: " + err.message);
    return;
  }
  console.log(`✅ Connected to database: ${process.env.DB_NAME}`);
  checkAndCreateTables();
});

const checkAndCreateTables = () => {
  const tables = [
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS work_groups (
      id INT AUTO_INCREMENT PRIMARY KEY,
      group_name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS meetings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      meeting_date DATE NOT NULL,
      location VARCHAR(255) NOT NULL,
      group_id INT,
      FOREIGN KEY (group_id) REFERENCES work_groups(id) ON DELETE SET NULL
    )`,

    `CREATE TABLE IF NOT EXISTS acting_director (
      id INT AUTO_INCREMENT PRIMARY KEY,
      acting_person VARCHAR(255) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL
    )`,
  ];

  tables.forEach((query) => {
    db.query(query, (err) => {
      if (err) {
        console.error("❌ Failed to create table:", err.message);
      }
    });
  });

};



module.exports = db;
