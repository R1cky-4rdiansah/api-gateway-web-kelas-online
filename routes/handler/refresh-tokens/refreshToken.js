const apiAdapter = require("../../apiAdapter");
const {
  URL_SERVICE_USERS,
  JWT_SECRET_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;
const jwt = require("jsonwebtoken");
const Api = apiAdapter(URL_SERVICE_USERS);

module.exports = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const email = req.body.email;

    if (!(refreshToken && email)) {
      return res.status(400).json({
        status: "error",
        message: "Token tidak valid",
      });
    }

    await Api.get("/refresh-token", {
      params: { refresh_token: refreshToken },
    });

    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, async (err, decoded) => {
      if (err) {
        return res.status(403).json(err.message);
      }

      if (email !== decoded.data.email) {
        return res.status(400).json({
          status: "error",
          message: "Email tidak valid",
        });
      }

      const newToken = await Api.get(`/users/${decoded.data.id}`);

      const token = jwt.sign({ data: newToken.data.data }, JWT_SECRET_TOKEN, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      });

      return res.json({
        status: "success",
        data: { token },
      });
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "Server tidak tersedia" });
    }

    const { status, data } = error.response;

    return res.status(status).json(data);
  }
};
