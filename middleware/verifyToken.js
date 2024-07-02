const jwt = require("jsonwebtoken");
const { JWT_SECRET_TOKEN } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET_TOKEN, (err, decode) => {
    if (err) {
      return res.status(403).json("Mohon untuk login terlebih dahulu");
    }
    req.user = decode;
    next();
  });
};
