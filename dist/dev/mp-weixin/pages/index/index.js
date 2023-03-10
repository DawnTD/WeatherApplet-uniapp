"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const stores_index = require("../../stores/index.js");
require("../../network/index.js");
require("../../network/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const store = stores_index.indexStore();
    const data = common_vendor.reactive({
      list: [],
      day: []
    });
    const isActiveq = common_vendor.ref("晴");
    const header_bg_q = common_vendor.ref("header_bg_q");
    const header_bg_y = common_vendor.ref("header_bg_y");
    const areacode = common_vendor.computed$1(() => {
      return store.areacode;
    });
    const param = common_vendor.reactive({
      areacode: "101010100"
    });
    const dayParms = common_vendor.reactive({
      days: "15",
      areacode: param.areacode
    });
    const changAreacode = () => {
      param.areacode = areacode.value;
    };
    const getWeather = async () => {
      let res = await api_index.getWeatherApi(param);
      console.log("res", res);
      data.list = res.data.result;
    };
    const getDay = async () => {
      let res = await api_index.getDayApi(dayParms);
      console.log("resDay", res);
      data.day = res.data.result.daily_fcsts;
    };
    const btn = () => {
      common_vendor.index.redirectTo({
        url: "/pages/search/search"
      });
    };
    const scroll = (e) => {
      console.log("e", e);
    };
    common_vendor.onMounted(() => {
      console.log("Mounted");
      changAreacode();
      getWeather();
      getDay();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(data.list.location.name),
        b: common_vendor.o(btn),
        c: common_vendor.t(data.list.realtime.temp),
        d: common_vendor.t(data.list.realtime.text),
        e: common_vendor.t(data.list.realtime.feels_like),
        f: common_vendor.t(data.list.realtime.wind_class),
        g: common_vendor.t(data.list.realtime.rh),
        h: common_vendor.t(data.list.realtime.pressure),
        i: common_vendor.f(data.day, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.week),
            b: common_vendor.t(item.date.substr(-5)),
            c: common_vendor.t(item.text_day),
            d: common_vendor.t(item.high),
            e: common_vendor.t(item.low),
            f: common_vendor.t(item.text_night),
            g: common_vendor.t(item.wd_day),
            h: common_vendor.t(item.wc_day)
          };
        }),
        j: common_vendor.o(scroll),
        k: common_vendor.n(isActiveq.value === data.list.realtime.text ? header_bg_q.value : header_bg_y.value)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "C:/Users/DawnTD/Desktop/WeChatApplets/WeatherApplet/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
