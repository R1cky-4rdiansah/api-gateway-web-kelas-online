const apiAdapater = require("../../apiAdapter");
const { URL_SERVICE_MEDIA } = process.env;

const Api = apiAdapater(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Api.delete(`/media/${id}`);
    return res.json(data.data);
  } catch (error) {
    if ((error.code == "ECONNREFUSED")) {
      return res
        .status(500)
        .json({ status: "error", message: "Server tidak tersedia" });
    }

    const { status, data } = error.response;

    return res.status(status).json(data);
  }
};
