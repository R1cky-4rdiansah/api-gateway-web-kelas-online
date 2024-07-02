const apiAdapter = require("../../apiAdapter");
const {
  URL_SERVICE_USERS,
  JWT_SECRET_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;
const jwt = require("jsonwebtoken");
const Api = apiAdapter(URL_SERVICE_USERS);

module.exports = async (req, res) => {
  try {
    const users = await Api.post("/users/login", req.body);
    const data = users.data.data;

    const token = jwt.sign({ data }, JWT_SECRET_TOKEN, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    });

    await Api.post("/refresh-token", {
      user_id: data.id,
      refresh_token: refreshToken,
    });

    return res.json({
      status: "success",
      data: {
        token,
        refreshToken,
      },
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
