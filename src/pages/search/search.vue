<template>
  <view class="w">
    <!-- 猜你想找 start -->
    <view>
      <text>猜你想找</text>
      <view class="flex">
        <button
          class="btn"
          @click="btn(item.areacode)"
          v-for="(item, index) in data"
          :key="index"
        >
          {{ item.name }}
        </button>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { indexStore } from '../../stores/index'
const store = indexStore()
const data = [
  {
    name: '南昌市',
    areacode: '101240101'
  },
  {
    name: '天津市',
    areacode: '101030100'
  },
  {
    name: '唐山市',
    areacode: '101090503'
  },
  {
    name: '景德镇市',
    areacode: '101240801'
  },
  {
    name: '九江市',
    areacode: '101240201'
  },
  {
    name: '鹰潭市',
    areacode: '101241101'
  }
]
const btn = (areacode: string) => {
  console.log('areacode', areacode)
  store.areacode = areacode
  uni.switchTab({
    url: '/pages/index/index'
  })
}
</script>
<style scoped lang="scss">
.w {
  padding-left: 40rpx;
  padding-right: 40rpx;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  .btn {
    width: 33%;
  }
}
</style>
