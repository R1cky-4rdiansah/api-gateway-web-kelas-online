const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_MEDIA } = process.env;

const Api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const media = await Api.post("/media", req.body);
    return res.json(media.data);
  } catch (error) {
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
