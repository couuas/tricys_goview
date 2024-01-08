<template>
  <div :style="getStyle(borderRadius)">
    <BorderBox :title="props.chartConfig.customData.title">
      <div class="item">
        <BareMetalServerIcon class="left"/>
        <div class="right">
          <div class="label">设备总数</div>
          <div class="value">{{obj.data1}}</div>
        </div>
      </div>
      <div class="item">
        <BareMetalServerIcon class="left leftRed"/>
        <div class="right rightRed">
          <div class="label">设备告警数</div>
          <div class="value">{{obj.data2}}</div>
        </div>
      </div>
      <div class="item">
        <SteeringWheelIcon class="left"/>
        <div class="right">
          <div class="label">测点总数</div>
          <div class="value">{{obj.data3}}</div>
        </div>
      </div>
      <div class="item">
        <SteeringWheelIcon class="left leftRed"/>
        <div class="right rightRed">
          <div class="label">测点告警数</div>
          <div class="value">{{obj.data4}}</div>
        </div>
      </div>
    </BorderBox>
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { BareMetalServer as BareMetalServerIcon } from '@vicons/carbon'
import { SteeringWheel as SteeringWheelIcon } from '@vicons/tabler'
import { publicInterface } from '@/api/path/business.api'
import BorderBox from '../components/BorderBox.vue'
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {RequestHttpIntervalEnum} from "@/enums/httpEnum";
import {isPreview} from "@/utils";

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
Object.assign(props.chartConfig.attr, { w: 380, h: 250 })
if(!props.chartConfig.request.requestInterval) Object.assign(props.chartConfig.request, { requestInterval: 15, requestIntervalUnit: RequestHttpIntervalEnum.SECOND })

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: ''
})

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

type objType = number|null
const obj = reactive({
  data1: null as objType,
  data2: null as objType,
  data3: null as objType,
  data4: null as objType
})
const getData = () => {
  publicInterface('/dcim/dems/statistic', 'count_device_all', {}).then(res => {
    if (res && res.data) {
      let data = res.data as {
        active_device_count:number
        active_device_alarm:number
        active_device_offline:number
      }
      obj.data1 = data.active_device_count
      obj.data2 = data.active_device_alarm + data.active_device_offline
    }
  })
  publicInterface('/dcim/dems/statistic', 'count_point_all', {}).then(res => {
    if (res && res.data) {
      let data = res.data as {
        active_point_count:number
        active_point_alarm:number
      }
      obj.data3 = data.active_point_count
      obj.data4 = data.active_point_alarm
    }
  })
}

let timer:unknown
watch(() => [props.chartConfig.request.requestInterval, props.chartConfig.request.requestIntervalUnit].join('&&'), v => {
  if(!isPreview()) return
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
onMounted(() => {
  getData()
  if(!isPreview()) return
  const obj = selectTimeOptions.find(_ => _.value === props.chartConfig.request.requestIntervalUnit) || {unit: 0}
  const unit = obj.unit
  const number = unit * props.chartConfig.request.requestInterval!
  timer = setInterval(() => {
    getData()
  }, number)
})
onUnmounted(() => {
  clearInterval(timer as number)
})

// 编辑更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
  },
  {
    immediate: true
  }
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.dataset = newData
})
</script>

<style lang="scss" scoped>
.item{
  background: rgba(65,150,255,.08);
  width: calc(50% - 7px);
  height: calc(50% - 7px);
  display: flex;
  align-items: center;
  justify-content: center;
  .left{
    color: #0ff;
    height: 60px;
  }
  .right{
    margin-left: 10px;
    .label{
      color: #fff;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
    }
    .value{
      color: #0ff;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      margin-top: 8px;
    }
  }
  .leftRed{
    color: #f43b42;
  }
  .rightRed{
    .value{
      color: #f43b42;
    }
  }
}
</style>
