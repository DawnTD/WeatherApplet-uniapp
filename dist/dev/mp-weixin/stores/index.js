"use strict";
const common_vendor = require("../common/vendor.js");
const indexStore = common_vendor.defineStore("indexStore", {
  state: () => ({
    areacode: "101010100",
    test: "storeTest",
    songArray: [],
    songDetail: "",
    songList: { boolean: true },
    //歌单头部动态,
    isLoading: true
  }),
  actions: {
    // async getSongDetail(id: number) {
    //     this.isLoading = true
    //     let res = await getSongDetailApi(id);
    //     this.songArray = res.data.playlist.tracks;
    //     this.songList = {
    //         ...res.data.playlist
    //     }
    //     this.isLoading = false;
    // }
  }
});
exports.indexStore = indexStore;
