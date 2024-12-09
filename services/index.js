const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/middleware/token-verification/auth.middleware")

// user related routes
router.use("/users", require("./users"));

// courses related routes
router.use("/courses", require("./courses"));

// course and its assigned faculty data store related routes
router.use("/courseFacultyAssignments", require("./courseFacultyAssignments"));

// course and its enrolled students data store related routes
router.use("/courseStudentEnrollments", require("./courseStudentEnrollments"))



module.exports = router;
