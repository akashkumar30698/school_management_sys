require("dotenv").config();


const mysql = require("mysql2/promise");

// Connection
const pool = mysql.createPool({
  host: `${process.env.MYSQLHOST}`,  
  user: `${process.env.MYSQLUSER}`,                   
  password: `${process.env.MYSQLPASSWORD}`,
  database: `${process.env.MYSQLDATABASE}`,             
  port: 35923,                     
  waitForConnections: true, 
  connectionLimit: 10,     
  queueLimit: 0
});

// Function to initialize database and create tables
async function initializeDatabase() {
  try {
    console.log("🔄 Connecting to the database...");
    
    const connection = await pool.getConnection(); 

    console.log("✅ Connected to the database successfully!");

    // Create `schools` table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Table 'schools' checked/created successfully!");

    connection.release();
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
}

module.exports = { pool, initializeDatabase };
