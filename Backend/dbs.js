import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let db;

// Connect to MySQL database
export async function connectDB() {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  console.log("✅ Connected to MySQL");
}

export function getDB() {
  return db;
}
