"use strict";
const network_index = require("../network/index.js");
function getWeatherApi(data) {
  return network_index.Request.get("/weather/v001/now", data);
}
function getCityApi(data) {
  return network_index.Request.get("/function/v001/city", data);
}
function getDayApi(data) {
  return network_index.Request.get("/weather/v001/day", data);
}
exports.getCityApi = getCityApi;
exports.getDayApi = getDayApi;
exports.getWeatherApi = getWeatherApi;
