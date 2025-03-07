const { createSchool, getAllSchools } = require("../models/schoolModel");
const { calculateDistance } = require("../utils/distance");

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const id = await createSchool(name, address, latitude, longitude);

   return  res.status(201).json({
      success: true,
      message: "School added successfully",
      data: { id, name, address, latitude, longitude },
    });
  } catch (error) {
    console.error("Error adding school:", error);
    return res.status(500).json({ success: false, message: "Failed to add school" });
  }
};

 const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ success: false, message: "Valid latitude and longitude are required" });
    }

    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);
    const schools = await getAllSchools();

    const schoolsWithDistance = schools.map((school) => ({
      ...school,
      distance: parseFloat(calculateDistance(userLat, userLng, school.latitude, school.longitude).toFixed(2)),
    }));

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

   return res.status(200).json({
      success: true,
      message: "Schools retrieved successfully",
      data: schoolsWithDistance,
    });
  } catch (error) {
    console.error("Error retrieving schools:", error);
   return  res.status(500).json({ success: false, message: "Failed to retrieve schools" });
  }
};

module.exports = {
  listSchools,
  addSchool
}
