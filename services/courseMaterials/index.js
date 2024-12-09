const express = require("express");
const router = express.Router();


// create a course material
router.post("/", require("./view/create-courseMaterial"));


// get all course material
router.get("/", require("./view/get-courseMaterial"));


// get single course material
router.get("/:id", require("./view/get-courseMaterial"));


// delete a single course material
router.delete("/:id", require("./view/delete-courseMaterial"));


// update a course material
router.patch("/:id", require("./view/update-courseMaterial"));



module.exports = router;