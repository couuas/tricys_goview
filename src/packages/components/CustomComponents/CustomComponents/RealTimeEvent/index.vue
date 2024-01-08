<template>
  <BorderBox ref="refBorderBox" :title="props.chartConfig.customData.title" :select1="select1" :select2="select2" :style="getStyle(borderRadius)" style="overflow: visible">
    <div class="itemBox">
      <div class="item" v-for="(item, i) in tableData" :key="i">
        <n-checkbox class="mr10" size="small"/>
        <n-tag class="mr5" size="small" strong :color="{textColor: '#000', color: item.confirm_status === 'ok' ? '#4DCA59' : '#f5b442'}">{{ item.confirm_status === 'ok'?'已确认':'未确认' }}</n-tag>
        <n-tag class="mr5" size="small" :color="{textColor: item.color1, borderColor: item.color1}">{{select1.options[item.level - 1].label}}</n-tag>
        <div style="color: rgba(255, 255, 255, 0.82);">{{ item.content }}</div>
        <div style="flex: 1"></div>
        <div class="mr10" style="color: #B5BAC3;">{{ moment(item.generate_time).format('yyyy-MM-DD HH:mm:ss') }}</div>
        <LocationIcon class="mr10" style="width: 20px;height: 20px;color: #4196ff;"/>
        <CheckCircleOutlinedIcon v-if="item.confirm_status === 'not'" style="width: 20px;height: 20px;color: #4196ff;"/>
        <div v-else style="width: 20px"></div>
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
import BorderBox from '../components/BorderBoxV2.vue'
import VChart from 'vue-echarts'
import {isPreview} from '@/utils'
import {graphic} from "echarts";
import {cloneDeep} from 'lodash'
import moment from "moment"
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {RequestHttpIntervalEnum} from "@/enums/httpEnum";
import {icon} from '@/plugins/icon'

const { LocationIcon } = icon.carbon
const { CheckCircleOutlinedIcon } = icon.material

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
Object.assign(props.chartConfig.attr, { w: 1000, h: 250 })
if(!props.chartConfig.request.requestInterval) Object.assign(props.chartConfig.request, { requestInterval: 15, requestIntervalUnit: RequestHttpIntervalEnum.SECOND })

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

const select1 = reactive({
  value: [1, 2],
  options: [
    { label: '严重', value: 1, number: 0, color: '#ff0000' },
    { label: '主要', value: 2, number: 0, color: '#f43b42' },
    { label: '次要', value: 3, number: 0, color: '#fc8358' },
    { label: '警告', value: 4, number: 0, color: '#f8ca00' },
    { label: '事件', value: 5, number: 0, color: '#4fbadb' },
  ]
})

const select2 = reactive({
  value: ['not'],
  options: [
    { label: '已确认', value: 'ok', number: 0, color: '#4DCA59' },
    { label: '未确认', value: 'not', number: 0, color: '#f5b442' },
  ]
})
type tableDataType = {
  id: number,
  content: string,
  generate_time: string,
  checked: boolean,
  confirm_status: 'ok' | 'not',
  level: number,
  color1: string,
  color2: string,
}[]
let tableData:tableDataType = reactive([])
let checkAll = ref(false)
const refBorderBox = ref(null)
const getData = () => {
  console.log(refBorderBox.value)
  const queryModel = {
    condition: {
      id: null,
      levels: select1.value,
      confirm_statuss: select2.value,
      space_complete_id: '',
      append_space_to_content: 'complete',
      recovery_statuss: ['not'],
    },
    page: {
      page_size: 10,
      page_number: 1
    }
  }
  publicInterface('/dcim/dems/devie_active_alarm', 'get_page', queryModel).then(res => {
    if(res && !res.data) {
      tableData.splice(0)
      return
    }
    if(res && res.data) {
      const lastTableData = [...tableData]
      let arr = res.data['item'].map((e:any) => ({
        id: e.id,
        content: e.content,
        generate_time: e.generate_time,
        level: e.level,
        checked: false,
        confirm_status: e.confirm_status,
        color1: select1.options.find(_ => _.value === e.level)!.color,
        color2: select2.options.find(_ => _.value === e.confirm_status)!.color,
      }))
      if (checkAll.value) {
        arr = arr.map((e:any) => ({ ...e, checked: e.confirm_status !== 'ok' }))
      } else if (lastTableData.length) {
        arr.map(e => {
          const lastIndex = lastTableData.findIndex(item => item.id === e.id)
          if (lastIndex !== -1) {
            e.checked = lastTableData[lastIndex].checked
          }
        })
      }
      arr = arr.concat(Array(10).fill({}).map(_ => ({
        id: 1234,
        content: '1234',
        generate_time: moment().format('x'),
        level: 2,
        checked: false,
        confirm_status: 'ok',
        color1: 'green',
        color2: 'green',
      })))
      tableData.splice(0, tableData.length, ...arr)
      console.log(tableData)
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
.mr5{
  margin-right: 5px;
}
.mr10{
  margin-right: 10px;
}
.itemBox{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .item{
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    margin: 3px 0;
    background: rgba(65,150,255,.05);
  }
}
</style>
