const express = require("express");
const router = express.Router();
const handleMyCourse = require("./handler/myCourses");

/* GET my course listing. */
router.get("/", handleMyCourse.get);
router.post("/", handleMyCourse.create);

module.exports = router;
