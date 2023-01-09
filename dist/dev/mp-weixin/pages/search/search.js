"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_index = require("../../stores/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    const store = stores_index.indexStore();
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data, (item, index, i0) => {
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
