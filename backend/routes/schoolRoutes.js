const express = require("express");
const { addSchool, listSchools } = require("../controller/schoolController");
const { validateSchoolData } = require("../middleware/validation");

const router = express.Router();

router.post("/addSchool", validateSchoolData, addSchool);
router.get("/listSchools", listSchools);

module.exports = router;
