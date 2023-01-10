"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const stores_index = require("../../stores/index.js");
require("../../network/index.js");
require("../../network/request.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_search_bar2 + _component_uni_section)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    const store = stores_index.indexStore();
    const param = common_vendor.reactive({
      location: "",
      items: "20",
      area: "china"
    });
    const areaList = common_vendor.reactive({
      list: []
    });
    const data = [
      {
        name: "南昌市",
        areacode: "101240101"
      },
      {
        name: "天津市",
        areacode: "101030100"
      },
      {
        name: "唐山市",
        areacode: "101090503"
      },
      {
        name: "景德镇市",
        areacode: "101240801"
      },
      {
        name: "九江市",
        areacode: "101240201"
      },
      {
        name: "鹰潭市",
        areacode: "101241101"
      }
    ];
    const btn = (areacode) => {
      console.log("areacode", areacode);
      store.areacode = areacode;
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    const getcity = async () => {
      let res = await api_index.getCityApi(param);
      console.log("res", res);
      areaList.list = res.data.areaList;
    };
    const search = () => {
      console.log("search");
    };
    const input = () => {
      console.log("input");
    };
    const clear = () => {
      console.log("clear");
    };
    const blur = () => {
      console.log("blur");
      getcity();
    };
    const focus = () => {
      console.log("focus");
    };
    const cancel = () => {
      console.log("cancel");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(search),
        b: common_vendor.o(blur),
        c: common_vendor.o(focus),
        d: common_vendor.o(input),
        e: common_vendor.o(cancel),
        f: common_vendor.o(clear),
        g: common_vendor.o(($event) => param.location = $event),
        h: common_vendor.p({
          focus: true,
          modelValue: param.location
        }),
        i: common_vendor.f(areaList.list, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.path),
            b: common_vendor.o(($event) => btn(item.areacode), item.areacode),
            c: item.areacode
          };
        }),
        j: common_vendor.p({
          title: "基本用法",
          type: "line"
        }),
        k: common_vendor.f(data, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.o(($event) => btn(item.areacode), index),
            c: index
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdfa925e"], ["__file", "C:/Users/DawnTD/Desktop/WeChatApplets/WeatherApplet/src/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
