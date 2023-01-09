"use strict";
const network_index = require("../network/index.js");
function getWeatherApi(data) {
  return network_index.Request.get("/now", data);
}
exports.getWeatherApi = getWeatherApi;
