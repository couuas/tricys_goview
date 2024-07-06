<template>
  <div :style="getStyle(borderRadius)" style="overflow: visible;">
    <BorderBox :title="customData?.title">
      <div class="inner">
        <div class="left">
          <VCircle :value="value" style="height: 100%;width: 100%"/>
        </div>
        <div class="right">
          <div class="item" v-for="(item, i) in rightArr" :key="i">
            <div v-if="i === 0" class="leftBox" style="position: absolute;height: 37%;display: flex;justify-content: center">
              <Svg style="height: 100%;width: 50%;"/>
            </div>
            <v-chart class="leftBox" :option="item.option" autoresize :update-options="{ notMerge: true, replaceMerge: ['series'] }"/>
            <div class="rightBox">
              <div>{{item.label}} {{item.unit}}</div>
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
import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted, computed } from 'vue'
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

const values = reactive(['1.000', '0.000', '0.000', '0.000'])
const value = computed(() => {
  let arr = []
  arr.push({label: customData.value.circle.title, id: customData.value.circle.id, value: values[0]})
  customData.value.leftBottom.forEach((item, i) => {
    arr.push({label: item.title, id: item.id, value: values[i + 1]})
  })
  return arr
})
const getPointData = (id: string) => {
  return publicInterface('/dcim/system/custom_large_screen', 'get_point_value', id)
}
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
watch(() => value.value.map(_ => _.id).toString(), async (v, o) => {
  if(v === o) return
  let diffIndex = -1
  let ids = v.split(',')
  let oIds = o.split(',')
  ids.forEach((id, i) => {
    if(id !== oIds[i]) diffIndex = i
  })
  let id = ids[diffIndex]
  if(id !== null && id !== '') {
    let res = await getPointData(id) as any
    if(res.errcode === '00000') {
      values[diffIndex] = formatNumber(Number(res.data.value))
    }
  }
  else {
    values[diffIndex] = diffIndex === 0 ? '1.000' : '0.000'
  }
})

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
}
const option3 = {
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
}
const values1 = reactive([0, 0, 0])
const options = reactive([option1, option2, option3])
const rightArr = computed(() => {
  let arr: {label: string, unit: string, id: string | null, value: number, option: any}[] = []
  customData.value.right.forEach((item, i) => {
    arr.push({
      label: item.title,
      unit: item.unit,
      id: item.id,
      value: values1[i],
      option: options[i]
    })
  })
  return arr
})

watch(() => rightArr.value.map(_ => _.id).toString(), async (v, o) => {
  if(v === o) return
  let diffIndex = -1
  let ids = v.split(',')
  let oIds = o.split(',')
  ids.forEach((id, i) => {
    if(id !== oIds[i]) diffIndex = i
  })
  let id = ids[diffIndex]
  if(id !== null && id !== '') {
    let res = await getPointData(id) as any
    if(res.errcode === '00000') {
      values1[diffIndex] = Number(res.data.value)
    }
  }
  else {
    values1[diffIndex] = 0
  }
})


const getData = () => {
  let ids = value.value.map(_ => _.id) as (string | null)[]
  ids = ids.concat(rightArr.value.map(_ => _.id))
  ids.forEach((id, i) => {
    if(id !== null && id !== '') {
      getPointData(id).then((res: any) => {
        if(res.errcode === '00000') {
          if (i < 4) values[i] = formatNumber(Number(res.data.value))
          else values1[i - 4] = res.data.value
        }
      })
    }
    else {
      if (i < 4) values[i] = i === 0 ? '1.000' : '0.000'
      else values1[i - 4] = 0
    }
  })
}
let timer:unknown
watch(() => values1, () => {
  if(values1[0] !== 0 && values1[1] !== 0) {
    let percent = ((values1[1] / values1[0]) * 100).toFixed(0)
    options[1].series[0].data[0].value = Number(percent)
    options[1].title[0].text = percent
  }
  else {
    options[1].series[0].data[0].value = 0
    options[1].title[0].text = '0'
  }
  if(values1[0] !== 0 && values1[2] !== 0) {
    let percent = ((values1[2] / values1[0]) * 100).toFixed(0)
    options[2].series[0].data[0].value = Number(percent)
    options[2].title[0].text = percent
  }
  else {
    options[2].series[0].data[0].value = 0
    options[2].title[0].text = '0'
  }
}, {
  deep: true
})

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
