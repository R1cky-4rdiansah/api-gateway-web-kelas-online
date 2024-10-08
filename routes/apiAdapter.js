const { default: axios } = require("axios");
const { TIMEOUT } = process.env;

module.exports = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: Number(TIMEOUT),
  });
};
