const express = require("express");
const router = express.Router();
const handleRefreshToken = require("./handler/refresh-tokens");

/* route users listing. */
router.post("/", handleRefreshToken.refreshToken);

module.exports = router;
