const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE, HOSTNAME_GATEWAY_API } = process.env;

const Api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const lesson = await Api.get("/api/lessons", {
      params: {
        ...req.query,
      },
    });

    return res.json(lesson.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "Server tidak tersedia" });
    }

    const { status, data } = error.response;

    return res.status(status).json(error);
  }
};
