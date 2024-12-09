const express = require("express");
const router = express.Router();

// Create a new course student enrollment 
router.post("/", require("./views/create-courseStudentEnrollment"));

// get all course student enrollment with populate data
router.get("/", require("./views/get-courseStudentEnrollments"));


// get single course student enrollment with populate data
router.get("/:id", require("./views/get-a-courseStudentEnrollment"));


// update a course student enrollment
router.patch("/:id", require("./views/update-courseStudentEnrollment"));


// delete a course student enrollment
router.delete("/:id", require("./views/delete-courseStudentEnrollment"));

module.exports = router;