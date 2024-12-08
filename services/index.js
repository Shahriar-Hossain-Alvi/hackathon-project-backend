const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/middleware/token-verification/auth.middleware")

router.use("/users", verifyToken, require("./users"));
router.use("/courses", verifyToken, require("./courses"));

module.exports = router;
