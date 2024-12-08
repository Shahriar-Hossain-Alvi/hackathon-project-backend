const express = require("express");
const router = express.Router();


// Create a new course
router.post("/", require("./views/create-course"));
router.get("/", require("./views/get-courses"));


module.exports = router;
