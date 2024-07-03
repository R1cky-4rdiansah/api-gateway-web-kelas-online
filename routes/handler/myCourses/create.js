const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const Api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const user_id = req.user.data.id;
    const course_id = req.body.course_id;
    const myCourse = await Api.post("/api/my-courses", {
      user_id,
      course_id,
    });
    return res.json(myCourse.data);
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
