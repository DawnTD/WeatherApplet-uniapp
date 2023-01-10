"use strict";
const network_index = require("../network/index.js");
function getWeatherApi(data) {
  return network_index.Request.get("/weather/v001/now", data);
}
function getCityApi(data) {
  return network_index.Request.get("/function/v001/city", data);
}
exports.getCityApi = getCityApi;
exports.getWeatherApi = getWeatherApi;
