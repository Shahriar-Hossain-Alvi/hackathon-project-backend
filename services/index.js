const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/middleware/token-verification/auth.middleware")

router.use("/users", require("./users"));
router.use("/courses", require("./courses"));
// router.use("/courseFacultyAssignment", require("./courseFacultyAssignments"));



module.exports = router;
