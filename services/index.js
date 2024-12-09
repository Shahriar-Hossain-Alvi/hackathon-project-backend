const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/middleware/token-verification/auth.middleware")

router.use("/users", require("./users"));
router.use("/courses", require("./courses"));
router.use("/courseFacultyAssignments", require("./courseFacultyAssignments"));



module.exports = router;
