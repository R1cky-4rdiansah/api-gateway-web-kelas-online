const express = require("express");
const router = express.Router();
const handleUsers = require("./handler/user");
const middlewareToken = require("../middleware/verifyToken");

/* GET users listing. */
router.post("/register", handleUsers.register);
router.post("/login", handleUsers.login);
router.put("/", middlewareToken, handleUsers.update);
router.get("/", middlewareToken, handleUsers.getUser);
router.post("/logout", middlewareToken, handleUsers.logout);

module.exports = router;
