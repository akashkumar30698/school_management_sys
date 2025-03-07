const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { initializeDatabase } = require("./config/dbConnect");
const router = require("./routes/schoolRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: "*" })); //Allow everyone to access
app.use(express.json());

app.use("/", router);

//  check endpoint
app.get("/", (req, res) => {
 return  res.status(200).json({ status: "OK", message: "Server is running" });
});



// Start server
async function startServer() {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port  http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

module.exports = app;
