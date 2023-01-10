<template>
  <view class="w">
    <view>
      <uni-section title="基本用法" type="line">
        <uni-search-bar
          @confirm="search"
          :focus="true"
          v-model="param.location"
          @blur="blur"
          @focus="focus"
          @input="input"
          @cancel="cancel"
          @clear="clear"
        >
        </uni-search-bar>
        <view class="search-result">
          <text
            @click="btn(item.areacode)"
            v-for="item in areaList.list"
            :key="item.areacode"
            class="search-result-text"
            >{{ item.path }}</text
          >
        </view>
      </uni-section>
    </view>
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
import { getCityApi } from '../../api'
import { indexStore } from '../../stores/index'
import { cityParam } from '../../type'
const store = indexStore()
const param = reactive<cityParam>({
  location: '',
  items: '20',
  area: 'china'
})
const areaList = reactive({
  list: [] as any
})
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
//section
const getcity = async () => {
  let res = await getCityApi(param)
  console.log('res', res)
  areaList.list = res.data.areaList
}
//uniSearchBar 的输入框 confirm 事件，返回参数为uniSearchBar的value
const search = () => {
  console.log('search')
}
//uniSearchBar 的 value 改变时触发事件，返回参数为uniSearchBar的value
const input = () => {
  console.log('input')
}
//点击清除按钮时触发事件，返回参数为uniSearchBar的value
const clear = () => {
  console.log('clear')
}
//input 失去焦点时触发事件，返回参数为uniSearchBar的value
const blur = () => {
  console.log('blur')
  getcity()
}
//input 获取焦点时触发事件，返回参数为uniSearchBar的value
const focus = () => {
  console.log('focus')
}
//点击取消按钮时触发事件，返回参数为uniSearchBar的value
const cancel = () => {
  console.log('cancel')
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
.search-result {
  display: flex;
  flex-direction: column;
}

.search-result-text {
  padding: 50rpx 30rpx;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
}

.example-body {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  padding: 0px;
}

.uni-mt-10 {
  margin-top: 10px;
}
</style>
