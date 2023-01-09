"use strict";
const common_vendor = require("../common/vendor.js");
const network_request = require("./request.js");
const baseUrl = "https://eolink.o.apispace.com/456456/weather/v001";
const Request = new network_request.requestClass();
Request.interceptors.request((request) => {
  if (request.header.contentType) {
    request.header["content-type"] = request.header.contentType;
    delete request.header.contentType;
  }
  if (request.method === "GET") {
    request.data = common_vendor.lib.stringify(request.data);
    request.url = request.url + "?" + request.data;
  }
  return request;
});
Request.interceptors.response((response) => {
  common_vendor.index.getStorageSync("token");
  return response;
});
Request.setConfig((config) => {
  config.baseURL = baseUrl;
  if (common_vendor.index.getStorageSync("token")) {
    config.header["Authorization"] = "Bearer " + common_vendor.index.getStorageSync("token");
  }
  return config;
});
exports.Request = Request;
