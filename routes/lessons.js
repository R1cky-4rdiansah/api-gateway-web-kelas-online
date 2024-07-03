const express = require("express");
const router = express.Router();
const handleLessons = require("./handler/lessons");

/* GET lesson listing. */
router.get("/", handleLessons.getAll);
router.get("/:id", handleLessons.get);
router.put("/:id", handleLessons.update);
router.post("/", handleLessons.create);
router.delete("/:id", handleLessons.destroy);

module.exports = router;
