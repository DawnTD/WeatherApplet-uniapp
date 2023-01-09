"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a;
const common_vendor = require("../common/vendor.js");
const config = Symbol("config");
const isCompleteURL = Symbol("isCompleteURL");
const requestBefore = Symbol("requestBefore");
const requestAfter = Symbol("requestAfter");
class requestClass {
  constructor() {
    // 默认配置
    __publicField(this, _a, {
      baseURL: "",
      url: "",
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "X-APISpace-Token": "sdh8p107helqi2wfxg5zanl5uds5gror",
        "Authorization-Type": "apikey"
      },
      method: "GET",
      timeout: 3e3,
      dataType: "json",
      responseType: "text"
    });
    // 拦截器
    __publicField(this, "interceptors", {
      request: (func) => {
        if (func) {
          requestClass[requestBefore] = func;
        } else {
          requestClass[requestBefore] = (request) => request;
        }
      },
      response: (func) => {
        if (func) {
          requestClass[requestAfter] = func;
        } else {
          requestClass[requestAfter] = (response) => response;
        }
      }
    });
  }
  // 请求之前，是默认配置
  static [(_a = config, requestBefore)](config2) {
    return config2;
  }
  // 请求之后，默认配置发生改变的话
  static [requestAfter](response) {
    return response;
  }
  // 判断url是否完整
  static [isCompleteURL](url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
  }
  request(options) {
    options.baseURL = options.baseURL || this[config].baseURL;
    options.dataType = options.dataType || this[config].dataType;
    options.url = requestClass[isCompleteURL](options.url) ? options.url : options.baseURL + options.url;
    options.data = options.data;
    options.header = { ...options.header, ...this[config].header };
    options.method = options.method || this[config].method;
    options = { ...options, ...requestClass[requestBefore](options) };
    return new Promise((resolve, reject) => {
      options.success = function(res) {
        resolve(requestClass[requestAfter](res));
      };
      options.fail = function(err) {
        reject(requestClass[requestAfter](err));
      };
      common_vendor.index.request(options);
    });
  }
  get(url, data = {}, options = {}) {
    return this.request({ ...options, url, data, method: "GET" });
  }
  post(url, data = {}, options = {}) {
    return this.request({ ...options, url, data, method: "POST" });
  }
  put(url, data = {}, options = {}) {
    return this.request({ ...options, url, data, method: "PUT" });
  }
  delete(url, data = {}, options = {}) {
    return this.request({ ...options, url, data, method: "DELETE" });
  }
  getConfig() {
    return this[config];
  }
  // 修改默认配置的一个方法，可以修改请求地址，请求方式等等..
  setConfig(func) {
    this[config] = func(this[config]);
  }
}
exports.requestClass = requestClass;
