<template>
  <div :style="getStyle(borderRadius)">
    <BorderBox :title="chartConfig?.customData?.title">
      <v-chart
        ref="vChartRef"
        :option="option"
        :manual-update="false"
        :update-options="{
          replaceMerge: ['series', 'xAxis', 'yAxis']
        }"
        autoresize
        style="overflow: visible;width: calc(50% - 10px);margin-right: 20px;"
      />
      <div class="box-5-item" style="width: calc(50% - 10px)">
        <SvgAll v-bind="nameObj"/>
      </div>
    </BorderBox>
  </div>
</template>

<script setup lang="ts">
import { PropType, watch, toRefs, reactive, onMounted, onUnmounted, nextTick, ref } from 'vue'
import {isPreview} from '@/utils'
import { CreateComponentType } from '@/packages/index.d'
import BorderBox from '../components/BorderBox.vue'
import SvgAll from './Svg.vue'
import {RequestHttpIntervalEnum} from "@/enums/httpEnum";
import { useOriginStore } from '@/store/modules/originStore/originStore'
import { publicInterface } from '@/api/path/business.api'
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import VChart from 'vue-echarts'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

const nameObj = reactive({
  urgentName: '紧急',
  seriousName: '严重',
  importantName: '重要',
  commonName: '一般',
  eventName: '事件',
  alarmMonitorData: {
    urgent: 0,
    serious: 0,
    important: 0,
    secondary: 0,
    record: 0
  },
  alarmLevels: [],
  urgentColor: '#cb3f3f',
  seriousColor: '#d87855',
  importantColor: '#dab42e',
  commonColor: '#47acea',
  eventColor: '#4fbadb',
})

const originStore = useOriginStore()
const systemConfig = originStore?.getOriginStore?.user?.systemConfig
const systemConstant = originStore?.getOriginStore?.user?.systemConstant
if (systemConfig['active_alarm_level']) {
  for (let i:number = 0; i < Number(systemConfig['active_alarm_level']); i++) {
    (nameObj.alarmLevels as number[]).push(i + 1)
  }
}

nameObj.urgentName = systemConstant['warn_levels'].find((item:any) => item.value === '1') ? systemConstant['warn_levels'].find((item:any) => item.value === '1')['label'] : '紧急'
nameObj.seriousName = systemConstant['warn_levels'].find((item:any) => item.value === '2') ? systemConstant['warn_levels'].find((item:any) => item.value === '2')['label'] : '严重'
nameObj.importantName = systemConstant['warn_levels'].find((item:any) => item.value === '3') ? systemConstant['warn_levels'].find((item:any) => item.value === '3')['label'] : '重要'
nameObj.commonName = systemConstant['warn_levels'].find((item:any) => item.value === '4') ? systemConstant['warn_levels'].find((item:any) => item.value === '4')['label'] : '一般'
nameObj.eventName = systemConstant['warn_levels'].find((item:any) => item.value === '5') ? systemConstant['warn_levels'].find((item:any) => item.value === '5')['label'] : '事件'

nameObj.urgentColor = systemConstant['warn_levels'].find((item:any) => item.value === '1') ? systemConstant['warn_levels'].find((item:any) => item.value === '1')['remark'] : '#cb3f3f'
nameObj.seriousColor = systemConstant['warn_levels'].find((item:any) => item.value === '2') ? systemConstant['warn_levels'].find((item:any) => item.value === '2')['remark'] : '#d87855'
nameObj.importantColor = systemConstant['warn_levels'].find((item:any) => item.value === '3') ? systemConstant['warn_levels'].find((item:any) => item.value === '3')['remark'] : '#dab42e'
nameObj.commonColor = systemConstant['warn_levels'].find((item:any) => item.value === '4') ? systemConstant['warn_levels'].find((item:any) => item.value === '4')['remark'] : '#47acea'
nameObj.eventColor = systemConstant['warn_levels'].find((item:any) => item.value === '5') ? systemConstant['warn_levels'].find((item:any) => item.value === '5')['remark'] : '#4fbadb'

const getData = () => {
  const confirm_statuss = systemConfig?.['active_alarm_confirm_status'] ? [...JSON.parse(systemConfig['active_alarm_confirm_status'])] : []
  const param = {
    confirm_statuss
  }

  publicInterface('/dcim/dems/devie_active_alarm', 'count_by_level_new', param).then(res => {
    if (res && res.data && JSON.stringify(res.data) !== '{}') {
      nameObj.alarmMonitorData['urgent'] = res.data['level1'] ? res.data['level1'] : 0
      nameObj.alarmMonitorData['serious'] = res.data['level2'] ? res.data['level2'] : 0
      nameObj.alarmMonitorData['important'] = res.data['level3'] ? res.data['level3'] : 0
      nameObj.alarmMonitorData['secondary'] = res.data['level4'] ? res.data['level4'] : 0
      nameObj.alarmMonitorData['record'] = res.data['level5'] ? res.data['level5'] : 0
      initChart()
    }
  })
}

let option = reactive({})
const initChart = () => {
  const len = nameObj.alarmLevels.length ? nameObj.alarmLevels.length : 4
  const yDataArr = [nameObj.eventName, nameObj.commonName, nameObj.importantName, nameObj.seriousName, nameObj.urgentName].reverse().slice(0, len).reverse()
  const dataArr = [nameObj.alarmMonitorData.record, nameObj.alarmMonitorData.secondary, nameObj.alarmMonitorData.important, nameObj.alarmMonitorData.serious, nameObj.alarmMonitorData.urgent].reverse().slice(0, len).reverse()
  const yAxisColorList = [
    nameObj.eventColor ? nameObj.eventColor : '#4fbadb',
    nameObj.commonColor ? nameObj.commonColor : '#47acea',
    nameObj.importantColor ? nameObj.importantColor : '#dab42e',
    nameObj.seriousColor ? nameObj.seriousColor : '#d87855',
    nameObj.urgentColor ? nameObj.urgentColor : '#cb3f3f'
  ].reverse().slice(0, len).reverse()
  const seriesColorList = [
    {
      // 横向线性渐变
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [{
        offset: 0, color: '#47acea00' // 0% 处的颜色
      }, {
        offset: 1, color: nameObj.eventColor ? nameObj.eventColor : '#4fbadb' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    },
    {
      // 横向线性渐变
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [{
        offset: 0, color: '#47acea00' // 0% 处的颜色
      }, {
        offset: 1, color: nameObj.commonColor ? nameObj.commonColor : '#47acea' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    },
    {
      // 横向线性渐变
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [{
        offset: 0, color: '#dab42e00' // 0% 处的颜色
      }, {
        offset: 1, color: nameObj.importantColor ? nameObj.importantColor : '#dab42e' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    },
    {
      // 横向线性渐变
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [{
        offset: 0, color: '#d8785500' // 0% 处的颜色
      }, {
        offset: 1, color: nameObj.seriousColor ? nameObj.seriousColor : '#d87855' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    },
    {
      // 横向线性渐变
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [{
        offset: 0, color: '#cb3f3f00' // 0% 处的颜色
      }, {
        offset: 1, color: nameObj.urgentColor ? nameObj.urgentColor : '#cb3f3f' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    }
  ].reverse().slice(0, len).reverse()
  const echart7Options = {
    grid: [
      {
        top: '-3%',
        bottom: '-15%',
        left: '10%',
        right: '0%',
        containLabel: true
      }
    ],
    xAxis: {
      show: false,
      // max: 1000,
      type: 'value',
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      data: dataArr
    },
    yAxis: [
      {
        type: 'category',
        // inverse: true,
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          // inside: true,
          // verticalAlign: 'center',
          // align: 'center',
          color: '#ccc',
          // padding: [0, 0, 0, 0],
          fontSize: 14
        },
        data: yDataArr
      },
      {
        type: 'category',
        // inverse: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          inside: false,
          // verticalAlign: 'bottom',
          // 位置 上右下左
          padding: [0, 10, 15, 0],
          // lineHeight: '40',
          textStyle: {
            fontSize: 14,
            color: (value:unknown, index:number) => {
              return yAxisColorList[index]
            }
          }
        },
        // 统计的总量 用纵坐标模拟
        data: dataArr
      }
    ],
    series: [
      {
        label: {
          show: false,
          fontSize: 16,
          fontWeight: 'bold',
          // formatter: '已使用{d}({c})',
          formatter: (params:any) => {
            return `已使用${(parseFloat(params.value) / 88888 * 100).toFixed(1)}%(${params.value})`
          },
          position: 'insideLeft',
          align: 'left'
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(134, 188, 255, 0.2)'
        },
        barWidth: 10,
        barCategoryGap: '30%',
        type: 'bar',
        data: dataArr,
        itemStyle: {
          normal: {
            // 设置柱状图颜色，注意：如果颜色太少的话，后面颜色不会自动循环
            color: (params:any) => {
              return seriesColorList[params.dataIndex]
            }
          }
        }
      }
    ]
  }
  Object.assign(option, echart7Options)
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

</script>

<style lang="scss" scoped>

</style>
