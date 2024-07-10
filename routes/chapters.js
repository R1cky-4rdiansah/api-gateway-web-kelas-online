const express = require("express");
const router = express.Router();
const handleChapters = require("./handler/chapters");

/* route chapter listing. */
router.get("/", handleChapters.getAll);
router.get("/:id", handleChapters.get);
router.put("/:id", handleChapters.update);
router.post("/", handleChapters.create);
router.delete("/:id", handleChapters.destroy);

module.exports = router;
