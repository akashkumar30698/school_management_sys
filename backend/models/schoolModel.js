const { pool } = require("../config/dbConnect.js")


const createSchool = async (name, address, latitude, longitude) => {
  let connection;
  try {
    connection = await pool.getConnection(); 
    const [result] = await connection.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );
    return result.insertId;
  } catch (error) {
    console.error("❌ Error in createSchool:", error);
    throw error;
  } finally {
    if (connection) connection.release(); 
  }
};

const getAllSchools = async () => {
  let connection;
  try {
    connection = await pool.getConnection(); 
    const [schools] = await connection.query("SELECT * FROM schools");
    return schools;
  } catch (error) {
    console.error("❌ Error in getAllSchools:", error);
    throw error;
  } finally {
    if (connection) connection.release(); 
  }
};

module.exports = { createSchool, getAllSchools };
