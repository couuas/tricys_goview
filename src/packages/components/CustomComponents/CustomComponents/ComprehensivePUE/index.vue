<template>
  <div :style="getStyle(borderRadius)" style="overflow: visible;">
    <BorderBox :title="props.chartConfig.customData.title">
      <div class="inner">
        <div class="left">
          <VCircle :value="value" style="height: 100%"/>
        </div>
        <div class="right">
          <div class="item" v-for="(item, i) in rightArr" :key="i">
            <Svg v-if="i === 0" class="leftBox" style="position: absolute;width: 60px;height: 37%;"/>
            <v-chart class="leftBox" :option="item.option" :update-options="{ notMerge: true, replaceMerge: ['series'] }"/>
            <div class="rightBox">
              <div>{{item.label}}</div>
              <div>{{item.unit}}</div>
              <div>{{item.value}}</div>
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
import Svg from './Svg.vue'
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {RequestHttpIntervalEnum} from "@/enums/httpEnum";

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

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

const value = reactive([
  {label: '实时PUE', value: '1.000'},
  {label: '昨日PUE', value: '0.000'},
  {label: '上周PUE', value: '0.000'},
  {label: '上月PUE', value: '0.000'},
])

const option1 = {
  title: [],
  grid: {
    top: '0%',
    bottom: '0%',
    left: '5%',
    right: '5%',
    containLabel: true
  },
  angleAxis: {
    max: 100,
    // clockwise: false, // 逆时针
    // 隐藏刻度线
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  radiusAxis: {
    type: 'category',
    // 隐藏刻度线
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  polar: {
    center: ['50%', '50%'],
    radius: '150%' // 图形大小
  },
  series: [{
    type: 'bar',
    data: [{
      value: 100,
      itemStyle: {
        normal: {
          color: '#4396fd'
          // color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
          //   offset: 0,
          //   color: '#aaf14f'
          // }, {
          //   offset: 1,
          //   color: '#0acfa1'
          // }])
        }
      }
    }],
    coordinateSystem: 'polar',
    roundCap: true,
    barWidth: 2,
    barGap: '-100%', // 两环重叠
    z: 2
  },
    { // 灰色环
      type: 'bar',
      data: [{
        value: 100,
        itemStyle: {
          color: '#000',
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 5,
          shadowOffsetY: 2
        }
      }],
      coordinateSystem: 'polar',
      roundCap: true,
      barWidth: 2,
      barGap: '-100%', // 两环重叠
      z: 1
    }]
}
const option2 = {
  title: [
    {
      show: true,
      text: '0',
      subText: '%',
      x: '45%',
      y: '25%',
      textAlign: 'center',
      textStyle: {
        color: '#00ffff',
        fontSize: 10
      }
    },
    {
      text: '%',
      left: '46%',
      top: '52%',
      textAlign: 'center',
      textStyle: {
        color: '#999',
        fontSize: 8
      }
    }
  ],
  grid: {
    top: '0%',
    bottom: '0%',
    left: '5%',
    right: '5%',
    containLabel: true
  },
  angleAxis: {
    max: 100,
    // clockwise: false, // 逆时针
    // 隐藏刻度线
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  radiusAxis: {
    type: 'category',
    // 隐藏刻度线
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  polar: {
    center: ['50%', '50%'],
    radius: '150%' // 图形大小
  },
  series: [{
    type: 'bar',
    data: [{
      value: 0,
      itemStyle: {
        normal: {
          color: '#00ffff'
          // color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
          //   offset: 0,
          //   color: '#aaf14f'
          // }, {
          //   offset: 1,
          //   color: '#0acfa1'
          // }])
        }
      }
    }],
    coordinateSystem: 'polar',
    roundCap: true,
    barWidth: 2,
    barGap: '-100%', // 两环重叠
    z: 2
  },
    { // 灰色环
      type: 'bar',
      data: [{
        value: 100,
        itemStyle: {
          color: '#000',
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 5,
          shadowOffsetY: 2
        }
      }],
      coordinateSystem: 'polar',
      roundCap: true,
      barWidth: 2,
      barGap: '-100%', // 两环重叠
      z: 1
    }]
}
const option3 = {
  title: [
    {
      show: true,
      text: '0',
      subText: '%',
      x: '45%',
      y: '25%',
      textAlign: 'center',
      textStyle: {
        color: '#f7c916',
        fontSize: 10
      }
    },
    {
      text: '%',
      left: '46%',
      top: '52%',
      textAlign: 'center',
      textStyle: {
        color: '#999',
        fontSize: 8
      }
    }
  ],
  grid: {
    top: '0%',
    bottom: '0%',
    left: '5%',
    right: '5%',
    containLabel: true
  },
  angleAxis: {
    max: 100,
    // clockwise: false, // 逆时针
    // 隐藏刻度线
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  radiusAxis: {
    type: 'category',
    // 隐藏刻度线
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  polar: {
    center: ['50%', '50%'],
    radius: '150%' // 图形大小
  },
  series: [{
    type: 'bar',
    data: [{
      value: 0,
      itemStyle: {
        normal: {
          color: '#f7c916'
          // color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
          //   offset: 0,
          //   color: '#aaf14f'
          // }, {
          //   offset: 1,
          //   color: '#0acfa1'
          // }])
        }
      }
    }],
    coordinateSystem: 'polar',
    roundCap: true,
    barWidth: 2,
    barGap: '-100%', // 两环重叠
    z: 2
  },
    { // 灰色环
      type: 'bar',
      data: [{
        value: 100,
        itemStyle: {
          color: '#000',
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 5,
          shadowOffsetY: 2
        }
      }],
      coordinateSystem: 'polar',
      roundCap: true,
      barWidth: 2,
      barGap: '-100%', // 两环重叠
      z: 1
    }]
}
const rightArr = reactive([
  { label: '总市电负载', value: 0, unit: '(kWh)', option: option1 },
  { label: 'IT用电负载', value: 0, unit: '(kWh)', option: option2 },
  { label: '其他负载', value: 0, unit: '(kWh)', option: option3 },
])
const getData = () => {
  // 实时pue、总市电负载、IT用电负载和其他用电负载
  const firstParams = {
    duration: 2, // 2，查询日报；3，查询月报
    start_time: moment().subtract(1, 'd').format('YYYY-MM-DD HH:00:00'),
    end_time: moment().format('YYYY-MM-DD HH:00:00'),
    strategy_ids: [props.chartConfig.customData!.id_1, props.chartConfig.customData!.id_2, props.chartConfig.customData!.id_3, props.chartConfig.customData!.id_4]
  }
  publicInterface('/dynamic_report/err', 'err', firstParams).then((res:any) => {
    if(res) res = res.data
    if (res && res.charts.length) {
      // 实时pue
      if (res.charts[1].series) {
        const pueData = res.charts[1].series[0].data || [0, 0]
        value[0].value = pueData[pueData.length - 1] ? pueData[pueData.length - 1] : pueData[pueData.length - 2]
        if (value[0].value) {
          value[0].value = Number(value[0].value).toFixed(3)
        } else {
          value[0].value = '0.000'
        }
      }
      // 总市电负载、IT用电负载和其他用电负载
      if (res.charts[0].series) {
        // const totalData = res.charts[0].series[0].data || [0, 0]
        const totalData = res.charts[0].series.find((item: any) => item.strategy_id === firstParams.strategy_ids[1]).data || [0, 0]
        const itData = res.charts[0].series.find((item: any) => item.strategy_id === firstParams.strategy_ids[2]).data || [0, 0]
        const otherData = res.charts[0].series.find((item: any) => item.strategy_id === firstParams.strategy_ids[3]).data || [0, 0]
        rightArr[0].value = totalData[totalData.length - 1] ? totalData[totalData.length - 1] : totalData[totalData.length - 2]
        rightArr[1].value = itData[itData.length - 1] ? itData[itData.length - 1] : itData[itData.length - 2]
        rightArr[2].value = otherData[otherData.length - 1] ? otherData[otherData.length - 1] : otherData[otherData.length - 2]
      }
      // 图表
      const one_IT_percent = parseFloat(rightArr[0].value.toString()) === 0 ? 0 : (parseFloat(rightArr[1].value.toString()) / parseFloat(rightArr[0].value.toString()) * 100).toFixed(2)
      const one_other_percent = parseFloat(rightArr[0].value.toString()) === 0 ? 0 : (100 - Number(one_IT_percent)).toFixed(2)
      rightArr[1].option.series[0].data[0].value = Number(one_IT_percent)
      rightArr[1].option.title[0].text = one_IT_percent.toString()
      rightArr[2].option.series[0].data[0].value = Number(one_other_percent)
      rightArr[2].option.title[0].text = one_other_percent.toString()
    }
  })
  // 昨日pue
  const secondParams = {
    duration: 3,
    start_time: moment().subtract(1, 'days').startOf('day').format('yyyy-MM-DD HH:mm:ss'),
    end_time: moment().startOf('day').format('yyyy-MM-DD HH:mm:ss'),
    strategy_ids: [props.chartConfig.customData!.id_1]
  }
  publicInterface('/dynamic_report/err', 'err', secondParams).then((res: any) => {
    res = res.data
    if (res) {
      if (res.tables.data.length && res.tables.data[0]['field0']) {
        value[1].value = res.tables.data[0]['field0'].toFixed(3)
      } else {
        value[1].value = '0.000'
      }
    }
  })
  // 上周pue、上月pue
  const thirdParams = {
    strategy_ids: [props.chartConfig.customData!.id_1]
  }
  publicInterface('/dynamic_report/err', 'pue_dashboard', thirdParams).then((res: any) => {
    res = res.data
    if (res && res.length) {
      if (res[0] && res[0].week_avg_pue) {
        value[2].value = Number(res[0].week_avg_pue).toFixed(3)
      } else {
        value[2].value = '0.000'
      }
      if (res[0] && res[0].month_avg_pue) {
        value[3].value = Number(res[0].month_avg_pue).toFixed(3)
      } else {
        value[3].value = '0.000'
      }
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
  if(timer) clearInterval(timer as number)
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
.inner{
  width: 100%;
  height: 100%;
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
      position: relative;
      padding: 5px 0;
      .leftBox{
        height: 60px;
        width: 60px;
      }
      .rightBox{
        color: #fff;
        width: calc(100% - 60px);
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
      }
    }
  }
}
</style>
