<template>
  <div style="overflow: visible;">
    <BorderBox :title="customData?.title">
      <div class="box">
        <div class="item" v-for="(it, i) in data" :key="i">
          <div class="row1">
            <div class="name">{{it.name}}</div>
            <div style="flex: 1;"></div>
            <div class="label">{{it.label}}</div>
            <div class="value">{{it.value}}</div>
          </div>
          <div class="row2">
            <div class="rect1"></div>
            <div class="rect" :style="{width: toPercent(it.value1, it.value)}"></div>
            <div class="label">{{it.label1}}</div>
            <div class="value">{{toPercent(it.value1, it.value)}}({{typeof it.value1 === 'number' ? it.value1 : '--'}})</div>
          </div>
          <div class="row3">
            <div class="col" v-for="(c, ci) in it.floor" :key="ci">
              <div class="label">{{c.label}}</div>
              <div class="value">{{typeof c.value === 'number' ? c.value : '--'}}</div>
            </div>
          </div>
        </div>
      </div>
    </BorderBox>
  </div>
</template>

<script setup lang="ts">
import BorderBox from '../components/BorderBox.vue'
import {computed, PropType, Ref, onMounted, ref, watch, onUnmounted} from "vue";
import { customData as customDataConfig } from './config'
import { CreateComponentType } from '@/packages/index.d'
import { cloneDeep } from 'lodash'
import { publicInterface } from '@/api/path/business.api'
import {isPreview} from "@/utils";
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const customData: Ref<typeof customDataConfig> = computed(() => {
  return props.chartConfig.customData as typeof customDataConfig
})

let data: Ref<any[]> = ref([])

onMounted(() => {
  data.value = resetData()
  if(customData.value.enable) getData()
})

const resetData = () => {
  let obj1 = cloneDeep(customData.value.topBox) as any
  obj1.value1 = null
  obj1.floor = obj1.floor.map((_: any) => ({..._, value: null}))

  let obj2 = cloneDeep(customData.value.bottomBox) as any
  obj2.value1 = null
  obj2.floor = obj2.floor.map((_: any) => ({..._, value: null}))
  return [obj1, obj2]
}

const getData = () => {
  let params: any = []
  let paramsMap: any = {}
  let obj = {
    time_out: 60,
    fmt: 2,
    abs: true
  }
  data.value.forEach((item, i) => {
    let o = {...obj} as any
    o.calculation = item.calculation
    if(item.name1) o.name = item.name1
    if(item.upper_limit !== 0) o.upper_limit = item.upper_limit
    paramsMap[params.length] = {dataIndex: i, floorIndex: null}
    params.push(o)

    item.floor.forEach((cIt: any, ci: number) => {
      let a = {...obj} as any
      a.calculation = cIt.calculation
      if(cIt.name) a.name = cIt.name
      if(cIt.upper_limit !== 0) a.upper_limit = cIt.upper_limit
      paramsMap[params.length] = {dataIndex: i, floorIndex: ci}
      params.push(a)
    })
  })
  publicInterface('/dcim/dems/device_point', 'get_value_by_point_uid_calculation', params).then((res: any) => {
    params.forEach((it: any, i:number) => {
      let o = paramsMap[i]
      if(typeof o.floorIndex === 'number') {
        data.value[o.dataIndex].floor[o.floorIndex].value = Number(res.data[i])
      }
      else {
        data.value[o.dataIndex].value1 = Number(res.data[i])
      }
    })
  })
}

watch([() => customData.value.topBox, () => customData.value.bottomBox, () => customData.value.enable], () => {
  data.value = resetData()
  if(customData.value.enable) getData()
}, {
  deep: true
})


let toPercent = (a: number, b: number) => {
  if(typeof a !== 'number' || typeof b !== 'number') return ''
  return (a * 100 / b).toFixed(1) + '%'
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
      if(customData.value.enable) getData()
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
    if(customData.value.enable) getData()
  }, number)
})
onUnmounted(() => {
  if(timer) clearInterval(timer as number)
})

</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.item{
  flex: none;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  .row1{
    flex: none;
    display: flex;
    height: 16px;
    .name, .label, .value{
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      color: #fff;
    }
    .label{
      color: #409eff;
    }
    .value{
      color: #409eff
    }
  }
  .row2{
    margin-top: 5px;
    display: flex;
    width: 100%;
    height: 24px;
    position: relative;
    .label, .value{
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      color: #fff;
      font-weight: bold;
    }
    .label{
      padding-left: 5px;
    }
    .rect1{
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background: #263d55;
      z-index: -2;
    }
    .rect{
      top: 0;
      left: 0;
      position: absolute;
      width: 0%;
      height: 100%;
      background: linear-gradient(to right, transparent, #00fdfd);
      z-index: -1;
    }
  }
  .row3{
    margin-top: 5px;
    display: flex;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    background: #142940;
    .col{
      padding: 0 5px;
      flex: 1;
      position: relative;
      display: flex;
      justify-content: space-between;
      .label, .value{
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        color: #fff;
      }
      .value{
        color: #00fdfd;
      }
      &::after{
        content: ' ';
        background: #27558E;
        position: absolute;
        top: 4px;
        right: 0;
        width: 1px;
        height: 16px;
      }
      &:nth-last-child(1)::after{
        background: transparent;
      }
    }
  }
}
</style>