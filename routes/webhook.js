const express = require("express");
const router = express.Router();
const handleWebhook = require("./handler/webhook");

/* route api webhook. */
router.post("/", handleWebhook.webhook);

module.exports = router;
