<template>
  <view
    :class="[isActiveq === data.list.realtime.text ? header_bg_q : header_bg_y]"
  >
    <!-- header start -->
    <view class="header-title">
      <view @click="btn" class="header-navigator">
        <image class="img" src="../../static/png/location.png"></image>
        <view>{{ data.list.location.name }}</view>
        <view>
          <image class="mt img" src="../../static/png/caret-down.png"></image
        ></view>
      </view>
    </view>
    <!-- weather start -->
    <view class="weather">
      <view class="flex weather-1">
        <text class="size">{{ data.list.realtime.temp }}</text>
        <text class="size_1">°</text>
      </view>
      <view class="flex weather-2">
        <view>{{ data.list.realtime.text }}</view>
        |
        <view>{{ data.list.realtime.feels_like }} 良</view>
      </view>
      <view class="flex weather-3">
        <view>风力{{ data.list.realtime.wind_class }}</view>
        <view>湿度{{ data.list.realtime.rh }}%</view>
        <view>气压{{ data.list.realtime.pressure }}hPa</view>
      </view>
      <view class="wl">未来两小时不会降雨</view>
    </view>
    <!-- 今明天气 -->
    <view class="j_w">
      <view class="j_left">
        <view class="j_left_1">
          <view>
            <text>今天</text>
            <text>轻度</text>
          </view>
          <view>
            <text>17°</text>
            /
            <text>6°</text>
          </view>
        </view>
        <view class="j_left_2">
          <text>晴</text>
          <text>太阳</text>
        </view>
      </view>
      <view class="j_left">
        <view class="j_left_1">
          <view>
            <text>明天</text>
            <text>良</text>
          </view>
          <view>
            <text>19°</text>
            /
            <text>8°</text>
          </view>
        </view>
        <view class="j_left_2">
          <text>多云转阵雨</text>
          <text>雨</text>
        </view>
      </view>
    </view>
    <!-- 15天预报 start -->
    <view>
      <view class="w_scroll">
        <view class="w-header">
          <text class="o_text">15天预报</text>
          <view style="margin-right: 20px">
            <text style="margin-right: 20px">07:04</text>
            <text>17:29</text>
          </view>
        </view>
        <scroll-view
          class="scroll-view_H"
          scroll-x="true"
          @scroll="scroll"
          scroll-left="120"
          enable-flex="true"
        >
          <view
            v-for="item in 15"
            id="demo1"
            class="scroll-view-item_H uni-bg-red"
          >
            <view>周日</view>
            <view>01/08</view>
            <view>晴</view>
            <view>20°</view>
            <view>4°</view>
            <view>多云</view>
            <view>东北风</view>
            <view>2级</view>
            <view>良</view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { getWeatherApi } from '../../api'
import { nowParam } from '../../type'
import { indexStore } from '../../stores/index'
const store = indexStore()
const data = reactive({
  list: [] as any
})
const isActiveq = ref('晴')
const header_bg_q = ref('header_bg_q')
const header_bg_y = ref('header_bg_y')

const areacode = computed(() => {
  return store.areacode
})
const param = reactive<nowParam>({
  areacode: '101010100'
})
const changAreacode = () => {
  param.areacode = areacode.value
}
const getWeather = async () => {
  let res = await getWeatherApi(param)
  console.log('res', res)
  data.list = res.data.result
}
const btn = () => {
  uni.redirectTo({
    url: '/pages/search/search'
  })
}
const scroll = (e: any) => {
  console.log('e', e)
}
onMounted(() => {
  console.log('Mounted')
  changAreacode()
  getWeather()
})
</script>

<style scoped lang="scss">
.header_bg_q {
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
}
.header_bg_y {
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
}
.header_bg_yun {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}
.header-title {
  padding-top: 40rpx;
  .header-navigator {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 4px;
    font-weight: 900;
    .img {
      width: 14px;
      height: 14px;
    }
    .mt {
      margin-top: 6px;
    }
  }
}

.weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60rpx;
  gap: 20px;
  .flex {
    display: flex;
    gap: 10px;
  }
  .weather-1 {
    .size {
      font-size: 200rpx;
    }
    .size_1 {
      font-size: 70rpx;
    }
  }
  .wl {
    width: 100%;
    padding: 20rpx 10rpx;
    // background-color: #d1d5db;
    text-align: center;
  }
}
.j_w {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 200rpx;
  padding: 30rpx 20rpx;
  // background-color: #f9fafb;
  .j_left {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    width: 45%;
    padding-left: 2%;
    padding-right: 2%;
    border-right: 1px solid #fff;
    .j_left_1 {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .j_left_2 {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
  .j_right {
    display: flex;
    flex-wrap: wrap;
    width: 50%;
  }
}
.w_scroll {
  margin-top: 80rpx;
  .w-header {
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding-bottom: 20rpx;
    border-bottom: 1px solid #f4f4f4;
    .o_text {
      margin-left: 22rpx;
      font-size: 34rpx;
      font-weight: 900;
    }
  }
}
.scroll-view_H {
  white-space: nowrap;
  width: 100%;
  height: 900rpx;
  display: flex;
  margin-top: 30rpx;
}
.scroll-view-item_H {
  display: flex;
  flex-direction: column;
  gap: 40rpx;
  width: 20%;
  height: 900rpx;
  text-align: center;
  font-size: 36rpx;
  padding-left: 22rpx;
  padding-right: 22rpx;
}
// .uni-bg-red {
//   background-color: red;
// }
</style>
