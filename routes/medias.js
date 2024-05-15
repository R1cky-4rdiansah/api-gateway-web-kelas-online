const express = require("express");
const router = express.Router();
const handler = require("./handler/media");

router.post("/", handler.create);

module.exports = router;
