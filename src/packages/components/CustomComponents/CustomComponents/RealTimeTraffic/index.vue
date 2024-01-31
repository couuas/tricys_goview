<template>
  <div :style="getStyle(borderRadius)" style="overflow: visible">
    <BorderBox :title="chartConfig?.customData?.title">
      <v-chart
        ref="vChartRef"
        :option="option"
        :manual-update="false"
        :update-options="{
          replaceMerge: []
        }"
        autoresize
        style="overflow: visible"
      />
    </BorderBox>
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted, nextTick, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { publicInterface } from '@/api/path/business.api'
import BorderBox from '../components/BorderBox.vue'
import VChart from 'vue-echarts'
import {isPreview, setTooltipPosition} from '@/utils'
import {graphic} from "echarts";
import moment from "moment"
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {RequestHttpIntervalEnum} from "@/enums/httpEnum";

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
    overflow: 'visible'
  }
}

const seriesItem = {
  type: 'line',
  showSymbol: false,
  symbol: 'circle',
  symbolSize: 8,
  smooth: true,
  label: {
    show: false
  },
  tooltip: {
    show: true
  },
  lineStyle: {
    normal: {
      color: '#4196ff',
    }
  },
  itemStyle: {
    normal: {
      color: '#4196ff',
      borderColor: '#4196ff'
    }
  },
  areaStyle: {
    normal: {
      color: new graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(65,150,255,0.5)'
      },
        {
          offset: 1,
          color: 'rgba(65,150,255,0)'
        }
      ], false),
      shadowColor: 'rgba(65,150,255,0.3)',
      shadowBlur: 20
    }
  },
  data: [],
}
const option = reactive({
  animation: false,
  legend: {
    show: false,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      show: false
    },
    axisLabel: {
      color: '#ccc',
      fontSize: 12
    },
    axisTick: {
      show: false
    },
    data: [],
  },
  yAxis: {
    nameTextStyle: {
      color: '#999'
    },
    type: 'value',
    axisLabel: {
      color: '#ccc',
      fontSize: 12
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(65, 150, 255, 0.2)'
      }
    },
    axisLine: {
      show: false
    }
  },
  grid: {
    top: '16px',
    left: '16px',
    right: '16px',
    bottom: '32px',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    formatter: null as null | string,
    position: setTooltipPosition(props.chartConfig.attr)
  },
  dataZoom: [
    {
      show: true,
      start: 0,
      end: 100,
      height: 20,
      bottom: 10,
      textStyle: {
        color: '#ccc'
      },
      dataBackground: {
        areaStyle: {
          color: '#353549',
          borderColor: '#34424f'
        },
        lineStyle: {
          color: '#364e68'
        }
      },
      backgroundColor: '#222b35',
      borderColor: '#34424f',
      handleStyle: {
        color: '#222b35',
        borderColor: '#27558e'
      },
      moveHandleStyle: {
        color: '#1b2e46',
        borderColor: '#364e68'
      },
      emphasis: {
        moveHandleStyle: {
          color: '#2c5a92',
          borderColor: '#364e68'
        }
      }
    },
    {
      type: 'inside',
      start: 0,
      end: 100
    },
    {
      show: true,
      yAxisIndex: 0,
      filterMode: 'empty',
      width: 20,
      height: '80%',
      showDataShadow: false,
      right: 0,
      textStyle: {
        color: '#ccc'
      },
      dataBackground: {
        areaStyle: {
          color: '#353549',
          // color: '#ff0000',
          borderColor: '#34424f'
        },
        lineStyle: {
          color: '#364e68'
        }
      },
      backgroundColor: '#222b35',
      borderColor: '#34424f',
      handleStyle: {
        color: '#222b35',
        borderColor: '#27558e'
      },
      moveHandleStyle: {
        color: '#1b2e46',
        borderColor: '#364e68'
      },
      emphasis: {
        moveHandleStyle: {
          color: '#2c5a92',
          borderColor: '#364e68'
        }
      }
    }
  ],
  series: [seriesItem]
})


const vChartRef = ref()
const getData = () => {
  const methodArr = 'handle'.split('_')
  const query = {
    types: ['rec'],
    start_time: moment().subtract(10, 'm').format('YYYY-MM-DD HH:mm:ss'),
    end_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    duration: 15,
    query_type: ''
  }
  query.types = [methodArr[0]]
  query.query_type = methodArr[1] || ''
  // option.xAxis['data'] = []
  // option.series[0]['data'] = []

  publicInterface('/dcim/dems/statistic', 'get_point_realtime_data_echarts', query).then((res:any) => {
    if (res && res.data && res.data['current']) {
      const data = res.data
      // option.xAxis['data'] = data['echarts'] && data['echarts']['xAxis'] && data['echarts']['xAxis']['data'] ? data['echarts']['xAxis']['data'].map((item:any) => {
      //   const time = query.query_type === '' ? moment(item).format('YYYY-MM-DD HH:mm:ss') : query.query_type === 'day' ? moment(item).format('YYYY-MM-DD') : moment(item).format('YYYY-MM')
      //   return time
      // }) : []
      // option.series[0]['data'] = data['echarts'] && data['echarts']['series'] && data['echarts']['series'][0] && data['echarts']['series'][0]['data'] ? data['echarts']['series'][0] && data['echarts']['series'][0]['data'] : []
      // if (query.query_type === '') {
      //   option.tooltip.formatter = '{b}<br/>' + '速率(测点/s)' + '&nbsp;&nbsp;' + '{c}'
      // } else {
      //   option.tooltip.formatter = '{b}<br/>' + '测点总数' + '&nbsp;&nbsp;' + '{c}'
      // }
      nextTick(() => {
        if(!vChartRef.value) return
        let xAxisData = data['echarts'] && data['echarts']['xAxis'] && data['echarts']['xAxis']['data'] ? data['echarts']['xAxis']['data'].map((item:any) => {
          const time = query.query_type === '' ? moment(item).format('YYYY-MM-DD HH:mm:ss') : query.query_type === 'day' ? moment(item).format('YYYY-MM-DD') : moment(item).format('YYYY-MM')
          return time
        }) : []
        let series0Data = data['echarts'] && data['echarts']['series'] && data['echarts']['series'][0] && data['echarts']['series'][0]['data'] ? data['echarts']['series'][0] && data['echarts']['series'][0]['data'] : []
        vChartRef.value.setOption({
          xAxis: { data: xAxisData },
          series: [{ data:series0Data }]
        })
      })
    }
  }).catch((e:unknown) => {
    console.log(e)
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
