<template>
  <div :style="getStyle(borderRadius)" style="overflow: visible;">
    <BorderBox :title="customData?.title">
      <div class="inner">
        <div class="left">
          <VCircle :value="circleArr" style="height: 100%;width: 100%"/>
        </div>
        <div class="right">
          <div class="item" v-for="(item, i) in rightArr" :key="i">
            <div v-if="i === 0" class="leftBox" style="position: absolute;height: 37%;display: flex;justify-content: center">
              <Svg style="height: 100%;width: 50%;"/>
            </div>
            <v-chart class="leftBox" :option="item.option" autoresize :update-options="{ notMerge: true, replaceMerge: ['series'] }"/>
            <div class="rightBox">
              <div>{{item.label}}</div>
<!--              <div>{{item.unit}}</div>-->
              <div>{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
    </BorderBox>
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted, ref, computed } from 'vue'
import type { Ref } from 'vue'
import { customData as customDataConfig } from './config'
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

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

const customData: Ref<typeof customDataConfig> = computed(() => {
  return props.chartConfig.customData as typeof customDataConfig
})

// 左1 中123 右123
const dataArr = ref([1, 0, 0, 0, 0, 0, 0])

const circleArr = computed(() => {
  let arr = [
    { label: customData.value.circle.title, value: formatNumber(dataArr.value[0]) },
    { label: customData.value.center.title1, value: formatNumber(dataArr.value[1]) },
    { label: customData.value.center.title2, value: formatNumber(dataArr.value[2]) },
    { label: customData.value.center.title3, value: formatNumber(dataArr.value[3]) },
  ]
  return arr
})

const rightArr = computed(() => {
  let arr = [
    { label: customData.value.right.title1, value: formatNumber(dataArr.value[4]), option: option1.value },
    { label: customData.value.right.title2, value: formatNumber(dataArr.value[5]), option: option2.value },
    { label: customData.value.right.title3, value: formatNumber(dataArr.value[6]), option: option3.value },
  ]
  return arr
})

const formatNumber = (num: number) => {
  // 使用 toFixed(3) 将数字转换为三位小数
  const formattedNum = num.toFixed(3);
  // 在小数点后面添加零
  const parts = formattedNum.split('.');
  parts[1] = parts[1].padEnd(3, '0');
  // 将整数部分和小数部分拼接起来
  const result = parts.join('.');
  return result;
}

const option1 = ref({
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
})
const option2 = ref({
  title: [
    {
      text: '0',
      left: 'center',
      top: '35%',
      textStyle: {
        color: '#00ffff',
        fontSize: 8
      }
    },
    {
      text: '%',
      left: 'center',
      top: '52%',
      textStyle: {
        color: '#999',
        fontSize: 8
      }
    }
  ],
  grid: {
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
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
})
const option3 = ref({
  title: [
    {
      text: '0',
      left: 'center',
      top: '35%',
      textStyle: {
        color: '#f7c916',
        fontSize: 8
      }
    },
    {
      text: '%',
      left: 'center',
      top: '52%',
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
})

const getLeftData = async () => {
  // dataArr.value[0] = 1
  if(customData.value.id) {
    const params = {
      duration: 3, // 2，查询日报；3，查询月报；4，年报
      start_time: moment().subtract(1, 'days').startOf('day').format('yyyy-MM-DD HH:mm:ss'),
      end_time: moment().startOf('day').format('yyyy-MM-DD HH:mm:ss'),
      strategy_ids: [Number(customData.value.id)]
    }
    let res = await publicInterface('/dynamic_report/err', 'err', params)
    if(res && res.data) {
      const resData = res.data.tables.data
      let field0DataLength = resData.length // 二期
      let field0Total = 0
      if (parseFloat(resData[0]['field0']) > 0) {
        // 大于0的值才计入平均
        field0Total += parseFloat(resData[0]['field0'])
      } else {
        // 异常值剔除出平均值计算
        field0DataLength--
      }
      // 24小时正常数据取平均
      if (field0DataLength > 0) {
        // this.building_one_day_pue = (parseFloat(field1Total / field1DataLength)).toFixed(2) // 四舍五入保留2位小数
        dataArr.value[0] = field0Total / field0DataLength
      } else {
        dataArr.value[0] = 0
      }
    }
  }
}

const getCenterData = async () => {
  // dataArr.value[2] = 0
  // dataArr.value[3] = 0
  if(customData.value.id) {
    const params = {
      strategy_ids: [Number(customData.value.id)]
    }
    let res = await publicInterface('/dynamic_report/err', 'pue_dashboard', params)
    if(res && res.data && res.data.length) {
      dataArr.value[2] = Number(res.data[0].week_avg_pue)
      dataArr.value[3] = Number(res.data[0].month_avg_pue)
    }
  }
}

const getRightData = async () => {
  // 设置默认值
  // dataArr.value[1] = 0
  // dataArr.value[4] = 0
  // dataArr.value[5] = 0
  // dataArr.value[6] = 0
  // option2.value.series[0].data[0].value = 0
  // option2.value.title[0].text = '0'
  // option3.value.series[0].data[0].value = 0
  // option3.value.title[0].text = '0'

  let item = {
    time_out: 60,
    fmt: 2,
    abs: true
  }
  let params = [
    { ...item, calculation: customData.value.right.calculation1, name: 'a' },
    { ...item, calculation: customData.value.right.calculation2, name: 'b' },
  ]
  let res = await publicInterface('/dcim/dems/device_point', 'get_value_by_point_uid_calculation', params)
  if(res && res.data) {
    res.data = res.data.map(Number)
    dataArr.value[4] = res.data[0]
    dataArr.value[5] = res.data[1]
    let percent5 = 0, percent6 = 0
    if(res.data[0] !== 0) {
      percent5 = res.data[1] / res.data[0]
      percent6 = 1 - percent5
      dataArr.value[1] = res.data[0] / res.data[1]
    }
    else dataArr.value[1] = 0
    dataArr.value[6] = res.data[0] - res.data[1]

    option2.value.series[0].data[0].value = 100 * percent5
    option2.value.title[0].text = (100 * percent5).toFixed(0)
    option3.value.series[0].data[0].value = 100 * percent6
    option3.value.title[0].text = (100 * percent6).toFixed(0)
  }
}

const toTwoDecimalPlaces = (num:number) => {
  return parseFloat(num.toFixed(2));
}

const resetData = () => {
  let a = toTwoDecimalPlaces(1 + Math.random() * 0.6)
  let b = toTwoDecimalPlaces(1 + Math.random() * 0.6)
  let c = toTwoDecimalPlaces(1 + Math.random() * 0.6)
  let d = toTwoDecimalPlaces(1 + Math.random() * 0.6)
  let e = toTwoDecimalPlaces(Math.random() * 5000)
  let f = toTwoDecimalPlaces(e * (0.8 + Math.random() * 0.1))
  let g = e - f

  dataArr.value = [a, b, c, d, e, f, g]
  option2.value.series[0].data[0].value = toTwoDecimalPlaces(f * 100 / e)
  option2.value.title[0].text = toTwoDecimalPlaces(f * 100 / e) + ''
  option3.value.series[0].data[0].value = toTwoDecimalPlaces(g * 100/ e)
  option3.value.title[0].text = toTwoDecimalPlaces(g * 100 / e) + ''
}

const getData = async () => {
  if(customData.value.demonstration) {
    resetData()
    return
  }
  if(!customData.value.enable) {
    dataArr.value = [1, 0, 0, 0, 0, 0, 0]
    option2.value.series[0].data[0].value = 0
    option2.value.title[0].text = '0'
    option3.value.series[0].data[0].value = 0
    option3.value.title[0].text = '0'
    return
  }
  getLeftData()
  getCenterData()
  getRightData()
}

watch(() => customData.value.enable, () => {
  getData()
})

watch(() => customData.value.demonstration, () => {
  getData()
})

let timer: unknown
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
</script>

<style lang="scss" scoped>
.inner{
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  .left{
    flex: 6;
    min-width: 60%;
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
    max-width: 40%;
    .item{
      box-sizing: border-box;
      height: 33.3%;
      display: flex;
      align-items: center;
      position: relative;
      padding: 5px 0;
      .leftBox{
        width: 35%;
        height: 100%;
      }
      .rightBox{
        width: 65%;
        height: 100%;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        //overflow: hidden;
        & > div:nth-child(2) {
          //margin: 5px 0;
        }
      }
    }
  }
}
</style>
