<template>
  <div :style="getStyle(borderRadius)" style="overflow: visible">
    <BorderBox title="综合PUE">
      <div class="box">
        <div class="left">
          <VCircle :value="value"/>
        </div>
        <div class="right">
          <div class="item" v-for="(item, i) in 3" :key="i">
            <div class="leftBox"></div>
            <div class="rightBox">
              <div>总市电负载</div>
              <div>(kWh)</div>
              <div>0</div>
            </div>
          </div>
        </div>
      </div>
    </BorderBox>
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted, nextTick, ref } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { publicInterface } from '@/api/path/business.api'
import BorderBox from '../components/BorderBox.vue'
import VChart from 'vue-echarts'
import {isPreview} from '@/utils'
import {graphic} from "echarts";
import {cloneDeep} from 'lodash'
import moment from "moment"
import VCircle from './VCircle.vue'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
Object.assign(props.chartConfig.attr, { w: 380, h: 250 })
const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

const value = reactive([
  {label: '实时PUE', value: '0.000'},
  {label: '昨日PUE', value: '0.000'},
  {label: '上周PUE', value: '0.000'},
  {label: '上月PUE', value: '0.000'},
])

// const option = shallowReactive({
//   dataset: ''
// })
// // 预览更新
// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
//   option.dataset = newData
// })
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  .left{
    flex: 6;
    .circle{

    }
    .bottomBox{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .right{
    flex: 4;
    .item{
      display: flex;
      align-items: center;
      .leftBox{

      }
      .rightBox{

      }
    }
  }
}
</style>
