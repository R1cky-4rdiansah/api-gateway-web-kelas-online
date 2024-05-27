const express = require("express");
const router = express.Router();
const handleRefreshToken = require("./handler/refresh-tokens");

/* GET users listing. */
router.post("/", handleRefreshToken.refreshToken);

module.exports = router;
