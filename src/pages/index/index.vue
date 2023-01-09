<template>
  <view>
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
      <view>未来两小时不会降雨</view>
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
onMounted(() => {
  console.log('Mounted')
  changAreacode()
  getWeather()
})
</script>

<style scoped lang="scss">
.header-title {
  margin-top: 40rpx;
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
}
</style>
