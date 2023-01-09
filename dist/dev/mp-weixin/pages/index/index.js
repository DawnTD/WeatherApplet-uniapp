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
      list: []
    });
    const areacode = common_vendor.computed$1(() => {
      return store.areacode;
    });
    const param = common_vendor.reactive({
      areacode: "101010100"
    });
    const changAreacode = () => {
      param.areacode = areacode.value;
    };
    const getWeather = async () => {
      let res = await api_index.getWeatherApi(param);
      console.log("res", res);
      data.list = res.data.result;
    };
    const btn = () => {
      common_vendor.index.redirectTo({
        url: "/pages/search/search"
      });
    };
    common_vendor.onMounted(() => {
      console.log("Mounted");
      changAreacode();
      getWeather();
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
        h: common_vendor.t(data.list.realtime.pressure)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "C:/Users/DawnTD/Desktop/WeChatApplets/WeatherApplet/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
