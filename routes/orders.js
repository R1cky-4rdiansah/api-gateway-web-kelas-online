const express = require("express");
const router = express.Router();
const handleOrders = require("./handler/orders");

/* route my course listing. */
router.get("/", handleOrders.getAll);

module.exports = router;
