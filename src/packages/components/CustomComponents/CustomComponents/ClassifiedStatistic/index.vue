<template>
  <BorderBox :title="chartConfig?.customData?.title" :style="getStyle(borderRadius)" style="overflow: auto">
   
    <div class="container">
      <div class="classify" v-for="item in type_count" :key="item">
      <div class="img">
        <img v-if="props.chartConfig?.customData?.currentSource==='IT'" src="@/assets/images/chart/decorates/Base1.png" alt="">
        <img v-else src="@/assets/images/chart/decorates/Base2.png" alt="">
      </div>
      <div class="value">
        {{Object.keys(item)[0]}}<span class="count">{{Object.values(item)[0]}}</span>台
      </div>
    </div>
    </div>
  </BorderBox>
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
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {RequestHttpIntervalEnum} from "@/enums/httpEnum";

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  },

  
})
const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}
console.log(props.chartConfig,'chartConfig');

let type_count:any = ref([])
const getData = () => {
  if(props.chartConfig?.customData?.currentSource==='IT'){
    publicInterface('/dcim/asset', 'get_asset_overview_page_info_new', {}).then(res => {
    console.log(res,'res----')
    if (res && res.data) {
      type_count.value = res.data.type_count
      // for (const key in computeNodeData) {
      //   computeNodeData[key] = res.data[key]
      // }
    }
  })
  }else{
    publicInterface('/dcim/dems/device', 'get_dev_category_count', {}).then(res => {
    console.log(res,'res----')
    if (res && res.data) {
      type_count.value = res.data.map((item:any)=>{
        return {
          [item.name]:item.count
        }
      })
      // for (const key in computeNodeData) {
      //   computeNodeData[key] = res.data[key]
      // }
    }
  })
  }
  
}
let timer:unknown
watch(() => [props.chartConfig.request.requestInterval, props.chartConfig.request.requestIntervalUnit].join('&&'), v => {
  if(!isPreview()) return
  console.log(props,'props')
  
  if(props.chartConfig.request.requestInterval) {
    if(timer) clearInterval(timer as number)
    const obj = selectTimeOptions.find(_ => _.value === props.chartConfig.request.requestIntervalUnit) || {unit: 0}
    const unit = obj.unit
    const number = unit * props.chartConfig.request.requestInterval
    timer = setInterval(() => {
      getData()
    }, number)
  }
})

watch(()=>props.chartConfig?.customData?.currentSource,()=>{

  console.log(props.chartConfig?.customData?.currentSource,'chartConfig');
getData()
  // 根据currentSource去获取对应 参数
  
})
onMounted(() => {
  nextTick(() => {

    getData()
  })
  if(!isPreview()) return
  const obj = selectTimeOptions.find(_ => _.value === props.chartConfig.request.requestIntervalUnit) || {unit: 0}
  const unit = obj.unit
  const number = unit * props.chartConfig.request.requestInterval!
  timer = setInterval(() => {
    nextTick(() => {
      getData()
    })
  }, number)
})
onUnmounted(() => {
  clearInterval(timer as number)
})

// const option = shallowReactive({
//   dataset: ''
// })
// // 预览更新
// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
//   option.dataset = newData
// })
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

}
.classify{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
  overflow: auto;
  color:#fff;
  .img{
  width: 100px;
  height: 100px;
  img{
    width: 100%;
    height: 100%;
  }
}
}
.count{
    font-size: 17px;
    padding: 0 5px;
    font-family: LESLIE;
    font-size: 20px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
    color: #4196FF;
}

</style>
