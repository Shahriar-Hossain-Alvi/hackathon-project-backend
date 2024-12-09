const express = require("express");
const router = express.Router();


// create a course material
router.post("/", require("./view/create-courseMaterial"))


module.exports = router;