const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_MEDIA } = process.env;

const Api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const data = await Api.get("/media");
    return res.json(data.data);
  } catch (error) {
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
