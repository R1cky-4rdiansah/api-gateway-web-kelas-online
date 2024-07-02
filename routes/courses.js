const express = require("express");
const router = express.Router();
const handleCourse = require("./handler/courses");

/* GET course listing. */
router.get("/:id", handleCourse.get);
router.put("/:id", handleCourse.update);
router.post("/", handleCourse.create);
router.get("/", handleCourse.getAll);
router.delete("/:id", handleCourse.destroy);

module.exports = router;
