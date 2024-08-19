<template>
  <BorderBox :title="chartConfig?.customData?.title" :style="getStyle(borderRadius)" style="overflow: auto">
    <div class="tab-item">
      <span class="change_tab" :class="{'change_tab--active': tab === 0}" @click="changeTab(0)">今日</span>
      <span class="change_tab" :class="{'change_tab--active': tab === 1}" @click="changeTab(1)">本月</span>
      <span class="change_tab" :class="{'change_tab--active': tab === 2}" @click="changeTab(2)">年度</span>
    </div>
    <div class="dynamic-component-main">
      <div class="system-introduction">
        <div class="system-introduction-main">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 396 220"
            width="100%"
            height="100%"
          >
            <defs>
              <linearGradient
                id="linear-gradient"
                x1="3"
                y1="25.85"
                x2="70"
                y2="25.85"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#0bd1ff" stop-opacity="0" />
                <stop offset="0.5" stop-color="#0bd1ff" stop-opacity="0.8" />
                <stop offset="1" stop-color="#0bd1ff" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="linear-gradient-2"
                y1="194.15"
                y2="194.15"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="未命名的渐变_5"
                x1="-3804"
                y1="1474.5"
                x2="-3724"
                y2="1474.5"
                gradientTransform="translate(3776.5 -1364.5)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#0bd1ff" stop-opacity="0" />
                <stop offset="0.25" stop-color="#0bd1ff" stop-opacity="0.8" />
                <stop offset="0.75" stop-color="#0bd1ff" stop-opacity="0.8" />
                <stop offset="1" stop-color="#0bd1ff" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="未命名的渐变_5-2"
                y1="1523.5"
                y2="1523.5"
                gradientTransform="translate(3825.5 -1413.5)"
                xlink:href="#未命名的渐变_5"
              />
              <linearGradient
                id="未命名的渐变_5-3"
                x1="-3324"
                y1="4582.5"
                x2="-3244"
                y2="4582.5"
                gradientTransform="translate(3433.5 -4501.5)"
                xlink:href="#未命名的渐变_5"
              />
              <linearGradient
                id="未命名的渐变_5-4"
                x1="-3324"
                y1="4640.5"
                x2="-3244"
                y2="4640.5"
                gradientTransform="translate(3433.5 -4501.5)"
                xlink:href="#未命名的渐变_5"
              />
            </defs>
            <!-- <title>告警bar</title> -->
            <g id="图层_2" data-name="图层 2">
              <g id="内容">
                <g id="左下">
                  <rect class="cls-1" x="255" y="183" width="120" height="20" />
                  <rect class="cls-2" x="255" y="137" width="120" height="20" />
                  <rect class="cls-3" x="255" y="91" width="120" height="20" />
                  <rect class="cls-4" x="255" y="45" width="120" height="20" />
                  <text class="cls-5" transform="translate(255 177)">{{ commonName }}</text>
                  <text class="cls-5" transform="translate(255 131)">{{ importantName }}</text>
                  <text class="cls-5" transform="translate(255 85)">{{ seriousName }}</text>
                  <text class="cls-5" transform="translate(255 39)">{{ urgentName }}</text>
                  <text class="cls-7" transform="translate(308.3 199)">
                    {{ alarmLevel["level_4"] }}
                  </text>
                  <text class="cls-7" transform="translate(308.3 153)">
                    {{ alarmLevel["level_3"] }}
                  </text>
                  <text class="cls-7" transform="translate(308.3 107)">
                    {{ alarmLevel["level_2"] }}
                  </text>
                  <text class="cls-7" transform="translate(308.3 61)">
                    {{ alarmLevel["level_1"] }}
                  </text>
                  <rect
                    class="cls-8"
                    x="12.5"
                    y="30.5"
                    width="49"
                    height="159"
                  />
                  <path
                    class="cls-9"
                    d="M61,31V189H13V31H61m1-1H12V190H62V30Z"
                  />
                  <g class="cls-10">
                    <polygon
                      class="cls-11"
                      points="4.41 29.71 3 28.29 9.29 22 64.21 22 70 27.79 68.59 29.21 63.38 24 10.12 24 4.41 29.71"
                    />
                  </g>
                  <g class="cls-10">
                    <polygon
                      class="cls-12"
                      points="64.21 198 9.29 198 3 191.71 4.41 190.29 10.12 196 63.38 196 68.59 190.79 70 192.21 64.21 198"
                    />
                  </g>
                  <rect
                    class="cls-13"
                    x="-27.5"
                    y="109.5"
                    width="80"
                    height="1"
                    transform="translate(-97.5 122.5) rotate(-90)"
                  />
                  <rect
                    class="cls-14"
                    x="21.5"
                    y="109.5"
                    width="80"
                    height="1"
                    transform="translate(-48.5 171.5) rotate(-90)"
                  />
                  <polygon
                    class="cls-9"
                    points="8 36.29 0 28.29 0 29.71 8 37.71 8 36.29"
                  />
                  <polygon
                    class="cls-9"
                    points="8 42 0 34 0 35.41 8 43.41 8 42"
                  />
                  <polygon
                    class="cls-9"
                    points="8 47.71 0 39.71 0 41.12 8 49.12 8 47.71"
                  />
                  <polygon
                    class="cls-9"
                    points="8 53.41 0 45.41 0 46.83 8 54.83 8 53.41"
                  />
                  <polygon
                    class="cls-9"
                    points="8 59.12 0 51.12 0 52.53 8 60.53 8 59.12"
                  />
                  <polygon
                    class="cls-9"
                    points="8 64.83 0 56.83 0 58.24 8 66.24 8 64.83"
                  />
                  <polygon
                    class="cls-9"
                    points="8 70.53 0 62.53 0 63.95 8 71.95 8 70.53"
                  />
                  <polygon
                    class="cls-9"
                    points="8 76.24 0 68.24 0 69.66 8 77.66 8 76.24"
                  />
                  <polygon
                    class="cls-9"
                    points="8 81.95 0 73.95 0 75.36 8 83.36 8 81.95"
                  />
                  <polygon
                    class="cls-9"
                    points="8 87.66 0 79.66 0 81.07 8 89.07 8 87.66"
                  />
                  <polygon
                    class="cls-9"
                    points="8 93.36 0 85.36 0 86.78 8 94.78 8 93.36"
                  />
                  <polygon
                    class="cls-9"
                    points="8 99.07 0 91.07 0 92.48 8 100.48 8 99.07"
                  />
                  <polygon
                    class="cls-9"
                    points="8 104.78 0 96.78 0 98.19 8 106.19 8 104.78"
                  />
                  <polygon
                    class="cls-9"
                    points="8 110.48 0 102.48 0 103.9 8 111.9 8 110.48"
                  />
                  <polygon
                    class="cls-9"
                    points="8 116.19 0 108.19 0 109.61 8 117.61 8 116.19"
                  />
                  <polygon
                    class="cls-9"
                    points="8 121.9 0 113.9 0 115.31 8 123.31 8 121.9"
                  />
                  <polygon
                    class="cls-9"
                    points="8 127.61 0 119.61 0 121.02 8 129.02 8 127.61"
                  />
                  <polygon
                    class="cls-9"
                    points="8 133.31 0 125.31 0 126.73 8 134.73 8 133.31"
                  />
                  <polygon
                    class="cls-9"
                    points="8 139.02 0 131.02 0 132.43 8 140.43 8 139.02"
                  />
                  <polygon
                    class="cls-9"
                    points="8 144.73 0 136.73 0 138.14 8 146.14 8 144.73"
                  />
                  <polygon
                    class="cls-9"
                    points="8 150.43 0 142.43 0 143.85 8 151.85 8 150.43"
                  />
                  <polygon
                    class="cls-9"
                    points="8 156.14 0 148.14 0 149.56 8 157.56 8 156.14"
                  />
                  <polygon
                    class="cls-9"
                    points="8 161.85 0 153.85 0 155.26 8 163.26 8 161.85"
                  />
                  <polygon
                    class="cls-9"
                    points="8 167.56 0 159.56 0 160.97 8 168.97 8 167.56"
                  />
                  <polygon
                    class="cls-9"
                    points="8 173.26 0 165.26 0 166.68 8 174.68 8 173.26"
                  />
                  <polygon
                    class="cls-9"
                    points="8 178.97 0 170.97 0 172.38 8 180.38 8 178.97"
                  />
                  <polygon
                    class="cls-9"
                    points="8 184.68 0 176.68 0 178.09 8 186.09 8 184.68"
                  />
                  <polygon
                    class="cls-9"
                    points="8 190.38 0 182.38 0 183.8 8 191.8 8 190.38"
                  />
                  <polygon
                    class="cls-9"
                    points="74 36.29 66 28.29 66 29.71 74 37.71 74 36.29"
                  />
                  <polygon
                    class="cls-9"
                    points="74 42 66 34 66 35.41 74 43.41 74 42"
                  />
                  <polygon
                    class="cls-9"
                    points="74 47.71 66 39.71 66 41.12 74 49.12 74 47.71"
                  />
                  <polygon
                    class="cls-9"
                    points="74 53.41 66 45.41 66 46.83 74 54.83 74 53.41"
                  />
                  <polygon
                    class="cls-9"
                    points="74 59.12 66 51.12 66 52.53 74 60.53 74 59.12"
                  />
                  <polygon
                    class="cls-9"
                    points="74 64.83 66 56.83 66 58.24 74 66.24 74 64.83"
                  />
                  <polygon
                    class="cls-9"
                    points="74 70.53 66 62.53 66 63.95 74 71.95 74 70.53"
                  />
                  <polygon
                    class="cls-9"
                    points="74 76.24 66 68.24 66 69.66 74 77.66 74 76.24"
                  />
                  <polygon
                    class="cls-9"
                    points="74 81.95 66 73.95 66 75.36 74 83.36 74 81.95"
                  />
                  <polygon
                    class="cls-9"
                    points="74 87.66 66 79.66 66 81.07 74 89.07 74 87.66"
                  />
                  <polygon
                    class="cls-9"
                    points="74 93.36 66 85.36 66 86.78 74 94.78 74 93.36"
                  />
                  <polygon
                    class="cls-9"
                    points="74 99.07 66 91.07 66 92.48 74 100.48 74 99.07"
                  />
                  <polygon
                    class="cls-9"
                    points="74 104.78 66 96.78 66 98.19 74 106.19 74 104.78"
                  />
                  <polygon
                    class="cls-9"
                    points="74 110.48 66 102.48 66 103.9 74 111.9 74 110.48"
                  />
                  <polygon
                    class="cls-9"
                    points="74 116.19 66 108.19 66 109.61 74 117.61 74 116.19"
                  />
                  <polygon
                    class="cls-9"
                    points="74 121.9 66 113.9 66 115.31 74 123.31 74 121.9"
                  />
                  <polygon
                    class="cls-9"
                    points="74 127.61 66 119.61 66 121.02 74 129.02 74 127.61"
                  />
                  <polygon
                    class="cls-9"
                    points="74 133.31 66 125.31 66 126.73 74 134.73 74 133.31"
                  />
                  <polygon
                    class="cls-9"
                    points="74 139.02 66 131.02 66 132.43 74 140.43 74 139.02"
                  />
                  <polygon
                    class="cls-9"
                    points="74 144.73 66 136.73 66 138.14 74 146.14 74 144.73"
                  />
                  <polygon
                    class="cls-9"
                    points="74 150.43 66 142.43 66 143.85 74 151.85 74 150.43"
                  />
                  <polygon
                    class="cls-9"
                    points="74 156.14 66 148.14 66 149.56 74 157.56 74 156.14"
                  />
                  <polygon
                    class="cls-9"
                    points="74 161.85 66 153.85 66 155.26 74 163.26 74 161.85"
                  />
                  <polygon
                    class="cls-9"
                    points="74 167.56 66 159.56 66 160.97 74 168.97 74 167.56"
                  />
                  <polygon
                    class="cls-9"
                    points="74 173.26 66 165.26 66 166.68 74 174.68 74 173.26"
                  />
                  <polygon
                    class="cls-9"
                    points="74 178.97 66 170.97 66 172.38 74 180.38 74 178.97"
                  />
                  <polygon
                    class="cls-9"
                    points="74 184.68 66 176.68 66 178.09 74 186.09 74 184.68"
                  />
                  <polygon
                    class="cls-9"
                    points="74 190.38 66 182.38 66 183.8 74 191.8 74 190.38"
                  />
                  <text class="cls-15 cls-22" transform="translate(35 60.74)">
                    告警总数
                  </text>
                  <rect class="cls-9" x="235" width="1" height="220" />
                  <rect class="cls-9" x="94" y="26" width="1" height="20" />
                  <rect class="cls-9" x="104" y="26" width="1" height="168" />
                  <rect class="cls-9" x="114" y="26" width="1" height="20" />
                  <rect class="cls-9" x="124" y="26" width="1" height="168" />
                  <rect class="cls-9" x="134" y="26" width="1" height="20" />
                  <rect class="cls-9" x="144" y="26" width="1" height="168" />
                  <rect class="cls-9" x="154" y="26" width="1" height="20" />
                  <rect class="cls-9" x="164" y="26" width="1" height="168" />
                  <rect class="cls-9" x="174" y="26" width="1" height="20" />
                  <rect class="cls-9" x="184" y="26" width="1" height="168" />
                  <rect class="cls-9" x="194" y="26" width="1" height="20" />
                  <rect class="cls-9" x="204" y="26" width="1" height="168" />
                  <rect class="cls-9" x="214" y="26" width="1" height="20" />
                  <rect class="cls-9" x="94" y="174" width="1" height="20" />
                  <rect class="cls-9" x="114" y="174" width="1" height="20" />
                  <rect class="cls-9" x="134" y="174" width="1" height="20" />
                  <rect class="cls-9" x="154" y="174" width="1" height="20" />
                  <rect class="cls-9" x="174" y="174" width="1" height="20" />
                  <rect class="cls-9" x="194" y="174" width="1" height="20" />
                  <rect class="cls-9" x="214" y="174" width="1" height="20" />
                  <polygon
                    class="cls-9"
                    points="36 0 36 22 37 22 37 1 395 1 395 219 37 219 37 198 36 198 36 220 396 220 396 0 36 0"
                  />
                  <rect class="cls-8" x="85" y="81" width="138" height="58" />
                  <path
                    class="cls-9"
                    d="M222,82v56H86V82H222m2-2H84v60H224V80Z"
                  />
                  <text class="cls-19" transform="translate(100.63 122)">
                    {{ alarmLevelTotal }}
                  </text>
                  <rect class="cls-20" x="109.5" y="80" width="80" height="2" />
                  <rect
                    class="cls-21"
                    x="109.5"
                    y="138"
                    width="80"
                    height="2"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </BorderBox>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted, nextTick, ref,Ref,computed } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { publicInterface } from '@/api/path/business.api'
import BorderBox from '../components/BorderBox.vue'
import { customData as customDataConfig } from './config'

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
const tab = ref(0)
const alarmLevelTotal = ref(0)
const commonName = ref('一般')
const importantName = ref('重要')
const seriousName = ref('严重')
const urgentName = ref('紧急')
const alarmLevel = ref({
        level_1: 0,
        level_2: 0,
        level_3: 0,
        level_4: 0
})

const alarmData = ref<any>({})
const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden',
  }
}
const customData: Ref<typeof customDataConfig> = computed(() => {
  return props.chartConfig.customData as typeof customDataConfig
})
const changeTab = (flag: number)=>{
tab.value = flag
      if (tab.value === 0) {
        alarmLevel.value = alarmData.value ? alarmData.value['day'] : { level_1: 0, level_2: 0, level_3: 0, level_4: 0 }
      } else if (tab.value === 1) {
        alarmLevel.value = alarmData.value ? alarmData.value['month'] : { level_1: 0, level_2: 0, level_3: 0, level_4: 0 }
      } else if (tab.value === 2) {
        alarmLevel.value = alarmData.value ? alarmData.value['year'] : { level_1: 0, level_2: 0, level_3: 0, level_4: 0 }
      }

      console.log(alarmLevel.value,'level_4')
      alarmLevelTotal.value = Number(alarmLevel.value['level_1']) + Number(alarmLevel.value['level_2']) + Number(alarmLevel.value['level_3'] + Number(alarmLevel.value['level_4']))
 
}
console.log(props.chartConfig,'chartConfig');

let type_count:any = ref([])
const alarmConfirmStatus = customData.value.alarmConfirmStatus.length ? customData.value.alarmConfirmStatus.split(',') : []
const alarmRecoveryStatus = customData.value.alarmRecoveryStatus.length ? customData.value.alarmRecoveryStatus.split(',') : []
const getData = () => {
  publicInterface('/dcim/dems/devie_history_alarm', 'alarm_statistical_by_time', {alarmConfirmStatus,alarmRecoveryStatus}).then((res:any) => {
        if (res.data) {
          alarmData.value = res.data
      console.log(alarmData.value,'getData_alarmLevel')

          changeTab(tab.value)
        }
      })
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
.tab-item {
      position: absolute;
      top: 0;
      right: 10px;
      padding-right: 10px;
      color: #fff;
      height: 40px;
      line-height: 40px;
      .change_tab {
        display: inline-block;
        margin: 0 4px;
        cursor: pointer;
        font-size: 14px;
        color: themed('dynamicComponentTabColor');
        font-family: 'PingFang-SC-Regular';
        &--active {
          border-bottom: 1px solid #4196ff;
          color: #4196ff;
          font-family: 'PingFang-SC-Bold';
        }
      }
    }
.dynamic-component-main{
  width:100%;
  padding: 10px;
}
// @import "./index.scss";

.cls-1 {
  fill: #4fbadb;
}
.cls-2 {
  fill: #f8ca00;
}
.cls-3 {
  fill: #fc8358;
}
.cls-4 {
  fill: #f43b42;
}
.cls-5 {
  font-size: 14px;
  fill: #fff;

}
.cls-15,
.cls-5 {
  font-family: MicrosoftYaHei, Microsoft YaHei;
}
.cls-15,
.cls-6,
.cls-7 {
  font-size: 16px;
}
.cls-15,
.cls-6,
.cls-7 {
  fill: #fff;
}
.cls-6 {
  font-family: ArialMT, Arial;
}
.cls-19,
.cls-7 {
  font-family: Arial-BoldMT, Arial;
  font-weight: 700;
}
.cls-8 {
  fill: #1e2832;
}
.cls-9 {
  fill: #27558e;
}
.cls-10,
.cls-13,
.cls-14,
.cls-20,
.cls-21 {
  opacity: 0.8;
}
.cls-11 {
  fill: url(#linear-gradient);
}
.cls-12 {
  fill: url(#linear-gradient-2);
}
.cls-13 {
  fill: url(#未命名的渐变_5);
}
.cls-14 {
  fill: url(#未命名的渐变_5-2);
}
.cls-16 {
  letter-spacing: -0.11em;
}
.cls-17 {
  letter-spacing: -0.02em;
}
.cls-18 {
  letter-spacing: 0em;
}
.cls-19 {
  fill: #fff;

  
  font-size: 30px;
}
.cls-20 {
  fill: url(#未命名的渐变_5-3);
}
.cls-21 {
  fill: url(#未命名的渐变_5-4);
}
.cls-22 {
  writing-mode: tb;
  text-orientation: upright;
  glyph-orientation-vertical: 0deg;
  font-size: 18px;
  letter-spacing: 0.3em;
  fill:#fff;
}
</style>
