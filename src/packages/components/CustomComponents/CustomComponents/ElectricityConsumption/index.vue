<template>
  <div style="overflow: visible;">
    <BorderBox :title="title">
      <div class="box">
        <n-radio-group class="radio" v-model:value="radio.value" size="small">
          <n-radio-button
            v-for="it in radio.options"
            :key="it.value"
            :value="it.value"
            :label="it.label"
          />
        </n-radio-group>
        <v-chart ref="vChartRef" :option="echart6Options" autoresize></v-chart>
      </div>
    </BorderBox>
  </div>
</template>

<script setup lang="ts">
import BorderBox from '../components/BorderBox.vue'
import VChart from 'vue-echarts'
import {computed, PropType, Ref, onMounted, ref, watch, onUnmounted} from "vue";
import { customData as customDataConfig } from './config'
import { CreateComponentType } from '@/packages/index.d'
import { publicInterface } from '@/api/path/business.api'
import {isPreview} from '@/utils'
import moment from 'moment'
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

const radio = ref({
  value: '周',
  options: [
    {label: '周', value: '周'},
    {label: '月', value: '月'},
    {label: '年', value: '年'},
  ]
})

let title = computed(() => {
  let v = ''
  if(radio.value.value === '周') return v =  customData.value.title
  else if(radio.value.value === '月') return v = customData.value.title1
  else if(radio.value.value === '年') return v = customData.value.title2
  return v
})

let weekData: Ref<any> = ref({})
const getWeekData = (i: number) => {
  let params = {
    strategy_ids: [customData.value.arr[i].id]
  }
  publicInterface('/dynamic_report/manager', 'query_err_report_by_one', params).then((res: any) => {
    if (res.data) {
      weekData.value[i] = res.data.map((e: any) => parseFloat(e.value).toFixed(2))
    } else {
      weekData.value[i] = [0, 0, 0, 0, 0, 0, 0]
    }
    handleChart()
  })
}

let monthData: Ref<any> = ref([])
const getMonthData = (duration: number, start_time: string, end_time: string) => {
  const params = {
    duration, // 2，查询日报；3，查询月报；4，年报
    start_time,
    end_time,
    strategy_ids: customData.value.arr.map(_ => _.id),
  }
  publicInterface('/dynamic_report/err', 'err', params).then((res: any) => {
    if (res.data && res.data.tables) {
      const data = res.data.tables.data
      monthData.value = customData.value.arr.map((item, i) => {
        return {
          name: item.name,
          value: data.map((e: any) => {
            if(e[`field${i}`]) {
              return e[`field${i}`]
            }
            else return 0
          })
        }
      })
    }
    handleChart()
  })
}

let echart6Options:Ref<any> = ref({})
const vChartRef = ref()
const handleChart = () => {
  // x轴数据
  let dateList:any = []
  let data: any = []
  if (radio.value.value === '周') {
    for (let i = 7; i > 0; i--) {
      dateList.push(moment().subtract(i, 'day').startOf('day').format('M月D日'))
    }
    data = customData.value.arr.map((item, i) => {
      return {
        name: item.name,
        value: weekData.value[i],
      }
    })
  }
  else if (radio.value.value === '月') {
    const startDate = moment().startOf('month').format('yyyy-MM-DD HH:mm:ss')
    const endDate = moment().endOf('month').subtract(1, 'day').format('yyyy-MM-DD HH:mm:ss')
    dateList.push(startDate)
    let addNum = 1
    while (dateList[dateList.length - 1] < endDate) {
      // 依次用当月第一天加，直到该月的最后一天
      dateList.push(moment(startDate).add(addNum, 'days').format('yyyy-MM-DD HH:mm:ss'))
      addNum++
    }
    dateList = dateList.map((e: any) => moment(e).format('M月D日'))
    data = monthData.value
  }
  else if (radio.value.value === '年') {
    dateList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    data = monthData.value
  }
  let color = [
    ['rgba(73, 146, 255, .3)', 'rgba(73, 146, 255, 1)'],
    ['rgba(124, 255, 178, .1)', 'rgba(124, 255, 178, 1)'],
    ['rgba(253, 221, 96, .3)', 'rgba(253, 221, 96, 1)'],
    ['rgba(255, 110, 118, .3)', 'rgba(255, 110, 118, 1)'],
    ['rgba(88, 217, 249, .3)', 'rgba(88, 217, 249, 1)'],
    ['rgba(5, 192, 145, .3)', 'rgba(5, 192, 145, 1)'],
    ['rgba(255, 138, 69, .3)', 'rgba(255, 138, 69, 1)'],
    ['rgba(141, 72, 227, .3)', 'rgba(141, 72, 227, 1)'],
    ['rgba(221, 121, 255, .3)', 'rgba(221, 121, 255, 1)']
  ]

  echart6Options.value = {
    color: color.map(_ => _[1]),
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      show: true,
      top: 0,
      right: 10,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 20,
      textStyle: {
        color: '#fff'
      },
      data: customData.value.arr.map(_ => _.name)
    },
    grid: {
      top: '25%',
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    yAxis: {
      name: 'kWh',
      nameTextStyle: {
        color: '#fff',
        padding: [0, 20, 0, 0]
      },
      type: 'value',
      // splitNumber: 4,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#363e83'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#363e83 '
        }
      },
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#ccc',
          fontWeight: 'normal',
          fontSize: '12'
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(22, 44, 127, .5)'
          }
        },
        axisLabel: {
          inside: false,
          textStyle: {
            color: '#ccc',
            fontWeight: 'normal',
            fontSize: '12'
          },
          interval: 0
        },
        data: dateList
      }
    ],
    series: data.map((_: any, i: number) => {
      return {
        name: _.name,
        type: 'bar',
        // xAxisIndex: 1,
        zlevel: 1,
        itemStyle: {
          normal: {
            color: () => {
              return {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: color[i][0]
                  },
                  {
                    offset: 1,
                    color: color[i][1]
                  }
                ]
              }
            }
          }
        },
        barWidth: '20%',
        data: _.value
      }
    }),
    dataZoom: [
      {
        show: true,
        height: 5,
        xAxisIndex: [0],
        bottom: 10,
        showDetail: false,
        showDataShadow: false,
        borderColor: 'transparent',
        textStyle: {
          fontSize: 0
        },
        startValue: 0,
        endValue: 7, // 从0开始的7个
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
        handleSize: '0%',
        handleStyle: {
          color: '#d3dee5'
        }
      },
      {
        type: 'inside',
        zoomLock: true,
        startValue: 0,
        endValue: 7 // 从0开始的7个
      }
    ]
  }
  if (radio.value.value === '月') {
    echart6Options.value.dataZoom[0].endValue = 7
    echart6Options.value.dataZoom[0].show = true
  } else {
    echart6Options.value.dataZoom[0].endValue = 31
    echart6Options.value.dataZoom[0].show = false
  }
}

const getData = () => {
  let v = radio.value.value
  if(customData.value.enable) {
    if(v === '周') {
      customData.value.arr.forEach((item, i) => {
        getWeekData(i)
      })
    }
    else if(v === '月') {
      getMonthData(3, moment().startOf('month').format('yyyy-MM-DD HH:mm:ss'), moment().endOf('month').format('yyyy-MM-DD HH:mm:ss'))
    }
    else if(v === '年') {
      getMonthData(4, moment().startOf('year').format('yyyy-MM-DD HH:mm:ss'), moment().endOf('year').format('yyyy-MM-DD HH:mm:ss'))
    }
  }
}

watch(() => radio.value.value, getData)
watch([() => customData.value.enable, () => customData.value.arr.map(_ => _.id)], getData, { deep: true })
watch(() => customData.value.arr.map(_ => _.name), handleChart, { deep: true })

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
  overflow: visible;
  position: relative;
  .radio{
    position: absolute;
    right: 0;
    top: -40px;
  }
}
</style>