const express = require("express");
const router = express.Router();
const handleCourse = require("./handler/courses");
const middlewareToken = require("../middleware/verifyToken");
const roles = require("../middleware/permission");

/* route course listing. */
router.get("/", handleCourse.getAll);
router.get("/:id", handleCourse.get);

router.put("/:id", middlewareToken, roles("admin"), handleCourse.update);
router.post("/", middlewareToken, roles("admin"), handleCourse.create);
router.delete("/:id", middlewareToken, roles("admin"), handleCourse.destroy);

module.exports = router;
