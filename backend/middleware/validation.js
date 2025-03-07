/**
 * Middleware to validate school data before adding to database
 */


function validateSchoolData(req, res, next) {
    const { name, address, latitude, longitude } = req.body
    const errors = []
  
    // Check if required fields are present
    if (!name) errors.push("School name is required")
    if (!address) errors.push("School address is required")
  
    // Validate latitude and longitude
    if (latitude === undefined || latitude === null) {
      errors.push("Latitude is required")
    } else if (
      isNaN(Number.parseFloat(latitude)) ||
      Number.parseFloat(latitude) < -90 ||
      Number.parseFloat(latitude) > 90
    ) {
      errors.push("Latitude must be a valid number between -90 and 90")
    }
  
    if (longitude === undefined || longitude === null) {
      errors.push("Longitude is required")
    } else if (
      isNaN(Number.parseFloat(longitude)) ||
      Number.parseFloat(longitude) < -180 ||
      Number.parseFloat(longitude) > 180
    ) {
      errors.push("Longitude must be a valid number between -180 and 180")
    }
  
    // Check name and address length
    if (name && (name.length < 2 || name.length > 255)) {
      errors.push("School name must be between 2 and 255 characters")
    }
  
    if (address && (address.length < 5 || address.length > 255)) {
      errors.push("School address must be between 5 and 255 characters")
    }
  
    // If there are validation errors, return them
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      })
    }
  
    // If validation passes, proceed to the next middleware/controller
    next()
  }

  module.exports = {
    validateSchoolData
  }
  
  