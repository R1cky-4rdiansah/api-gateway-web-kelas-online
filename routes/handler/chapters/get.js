const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const Api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    id = req.params.id;
    const chapter = await Api.get(`/api/chapters/${id}`);
    return res.json(chapter.data);
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
