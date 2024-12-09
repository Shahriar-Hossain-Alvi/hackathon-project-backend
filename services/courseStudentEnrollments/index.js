const express = require("express");
const router = express.Router();

// Create a new course student enrollment 
router.post("/", require("./views/create-courseStudentEnrollment"));

// get all course student enrollment with populate data
router.get("/", require("./views/get-courseStudentEnrollments"));

module.exports = router;