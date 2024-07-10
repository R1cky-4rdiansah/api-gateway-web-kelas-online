const express = require("express");
const router = express.Router();
const handleCourse = require("./handler/courses");
const middlewareToken = require("../middleware/verifyToken");

/* route course listing. */
router.get("/", handleCourse.getAll);
router.get("/:id", handleCourse.get);

router.put("/:id", middlewareToken, handleCourse.update);
router.post("/", middlewareToken, handleCourse.create);
router.delete("/:id", middlewareToken, handleCourse.destroy);

module.exports = router;
