const express = require("express");
const router = express.Router();


// Create a new course
router.post("/", require("./views/create-course"));

// get all course
router.get("/", require("./views/get-courses"));

// get single course
router.get("/:id", require("./views/get-a-course"));

// update single course
router.patch("/:id", require("./views/update-a-course")); 



module.exports = router;
