var express = require('express');
var router = express.Router();
const { APP_NAME } = process.env;

/* route home page. */
router.get('/', function(req, res, next) {
  res.render("index", { title: APP_NAME });
});

module.exports = router;
