const express = require("express");
const router = express.Router();


// Create a new course
router.post("/", require("./views/create-course"));
router.get("/", require("./views/get-courses"));
router.get("/:id", require("./views/get-a-course"));


module.exports = router;
