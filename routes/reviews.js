const express = require("express");
const router = express.Router();
const handleReviews = require("./handler/reviews");

/* GET review listing. */
router.put("/:id", handleReviews.update);
router.post("/", handleReviews.create);
router.delete("/:id", handleReviews.destroy);

module.exports = router;
