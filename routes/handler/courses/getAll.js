const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE, HOSTNAME_GATEWAY_API } = process.env;

const Api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const course = await Api.get("/api/courses", {
      params: {
        ...req.query,
        status: "publish",
      },
    });

    const dataCourse = course.data;
    const firsPage = dataCourse.data.first_page_url.split("?").pop();
    const lastPage = dataCourse.data.last_page_url.split("?").pop();

    dataCourse.data.first_page_url = `${HOSTNAME_GATEWAY_API}/courses?${firsPage}`;
    dataCourse.data.last_page_url = `${HOSTNAME_GATEWAY_API}/courses?${lastPage}`;

    const nextPageUrl = dataCourse.data.next_page_url;
    const prevPageUrl = dataCourse.data.prev_page_url;
    const pathUrl = dataCourse.data.path;

    dataCourse.data.path = `${HOSTNAME_GATEWAY_API}/course`;

    if (nextPageUrl) {
      const nextPage = dataCourse.data.next_page_url.split("?").pop();
      dataCourse.data.next_page_url = `${HOSTNAME_GATEWAY_API}/courses?${nextPage}`;
    }

    if (prevPageUrl) {
      const prevPage = dataCourse.data.prev_page_url.split("?").pop();
      dataCourse.data.prev_page_url = `${HOSTNAME_GATEWAY_API}/courses?${prevPage}`;
    }

    const linksPage = dataCourse.data.links;

    linksPage.forEach((val, index, array) => {
      if (val.url) {
        const urlPage = val.url.split("?").pop();
        const newUrl = `${HOSTNAME_GATEWAY_API}/courses?${urlPage}`;
        array[index].url = newUrl;
      }
    });

    return res.json(dataCourse);
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
