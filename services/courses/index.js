const express = require("express");
const router = express.Router();


// Create a new course
router.post("/", require("./views/create-course"));


module.exports = router;
