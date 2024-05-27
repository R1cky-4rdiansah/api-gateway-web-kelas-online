const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_USERS } = process.env;

const Api = apiAdapter(URL_SERVICE_USERS);

module.exports = async (req, res) => {
  try {
    const id = req.user.data.id;
    const users = await Api.get(`/users/${id}`);
    return res.json(users.data);
  } catch (error) {
    console.log(error.code);
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "Server tidak tersedia" });
    }

    const { status, data } = error.response;

    return res.status(status).json(data);
  }
};
