const express = require("express");
const router = express.Router();

// Create a new courseFacultyAssignment
router.post("/", require("./views/create-courseFacultyAssignment"));

// Get all courseFacultyAssignment
router.get("/", require("./views/get-courseFacultyAssignment"));

// Get a courseFacultyAssignment
router.get("/:id", require("./views/get-a-courseFacultyAssignment"))

// delete a courseFacultyAssignment
router.delete("/:id", require("./views/delete-courseFacultyAssignment"))

// update a courseFacultyAssignment
router.patch("/:id", require("./views/Update-courseFacultyAssignment"));

module.exports = router;