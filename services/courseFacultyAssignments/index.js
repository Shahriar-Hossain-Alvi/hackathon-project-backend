const express = require("express");
const router = express.Router();

router.post("/", require("./views/create-courseFacultyAssignment"))