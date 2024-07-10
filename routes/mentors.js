const express = require("express");
const router = express.Router();
const handleMentors = require("./handler/mentors");

/* route mentor listing. */
router.get("/:id", handleMentors.get);
router.put("/:id", handleMentors.update);
router.post("/", handleMentors.create);
router.get("/", handleMentors.getAll);
router.delete("/:id", handleMentors.destroy);

module.exports = router;
