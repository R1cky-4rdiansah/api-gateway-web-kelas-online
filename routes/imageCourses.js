const express = require("express");
const router = express.Router();
const handleImageCourse = require("./handler/imageCourses");

/* route image course listing. */
router.post("/", handleImageCourse.create);
router.delete("/:id", handleImageCourse.destroy);

module.exports = router;
