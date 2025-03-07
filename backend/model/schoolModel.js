const { pool } = require("../config/dbConnect.js")


const createSchool = async (name, address, latitude, longitude) => {
  let connection;
  try {
    connection = await pool.getConnection(); // ✅ Get a connection from the pool
    const [result] = await connection.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );
    return result.insertId;
  } catch (error) {
    console.error("❌ Error in createSchool:", error);
    throw error;
  } finally {
    if (connection) connection.release(); // ✅ Always release connection
  }
};

const getAllSchools = async () => {
  let connection;
  try {
    connection = await pool.getConnection(); // ✅ Get a connection from the pool
    const [schools] = await connection.query("SELECT * FROM schools");
    return schools;
  } catch (error) {
    console.error("❌ Error in getAllSchools:", error);
    throw error;
  } finally {
    if (connection) connection.release(); // ✅ Always release connection
  }
};

module.exports = { createSchool, getAllSchools };
