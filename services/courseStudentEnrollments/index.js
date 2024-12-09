const express = require("express");
const router = express.Router();

// Create a new course student enrollment 
router.post("/", require("./views/create-courseStudentEnrollment"));


module.exports = router;