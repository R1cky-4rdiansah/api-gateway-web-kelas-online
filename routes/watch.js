const express = require("express");
const router = express.Router();
const handleWatch = require("./handler/watch");

/* route api webhook. */
router.post("/", handleWatch.create);

module.exports = router;
