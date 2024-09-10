<template>
  <div v-if="chartConfig.customData?.mapId" :style="getStyle(borderRadius)" class="box" style="overflow: visible;position: relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 120 141.16"
      style="width: 180px; height: 142px; position: absolute; z-index: 99;"
    >
      <defs>
        <linearGradient id="statistics_76" y1="862.16" x2="120" y2="862.16" gradientTransform="matrix(1, 0, 0, -1, 0, 890.33)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="aqua" stop-opacity="0.5" />
          <stop offset="1" stop-color="aqua" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient id="statistics_77" y1="818.16" x2="120" y2="818.16" gradientTransform="matrix(1, 0, 0, -1, 0, 890.33)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#4dca59" stop-opacity="0.5" />
          <stop offset="1" stop-color="#4dca59" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient id="statistics_78" y1="774.16" x2="120" y2="774.16" gradientTransform="matrix(1, 0, 0, -1, 0, 890.33)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#f43b42" stop-opacity="0.5" />
          <stop offset="1" stop-color="#f43b42" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient id="statistics_79" y1="730.16" x2="120" y2="730.16" gradientTransform="matrix(1, 0, 0, -1, 0, 890.33)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#999" stop-opacity="0.5" />
          <stop offset="1" stop-color="#999" stop-opacity="0.1" />
        </linearGradient>
      </defs>
      <g>
        <rect y="27.16" width="120" height="2" style="fill:url(#statistics_76)" />
        <rect y="27.16" width="14" height="2" style="fill:aqua" />
        <g id="正常点-22">
          <path d="M7,3.16a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-1a7,7,0,1,0,7,7A7,7,0,0,0,7,2.16Z" style="fill:aqua" />
          <circle cx="7" cy="9.16" r="3" style="fill:aqua" />
        </g>
        <!-- <text transform="translate(24 14.16)" style="isolation:isolate;font-size:12px;fill:#ccc;font-family:AdobeSongStd-Light-GBpc-EUC-H, Adobe Song Std">全部站点</text> -->
        <text transform="translate(24 14.16)" style="isolation:isolate;font-size:12px;fill:#ccc">全部站点</text>
        <text transform="translate(95.48 17.16)" style="isolation:isolate;font-size:20px;fill:aqua;font-family:ArialMT, Arial">{{ allNumber }}</text>
        <rect y="33.16" width="120" height="40" style="fill:#4dca59;fill-opacity:0" />
        <rect y="71.16" width="120" height="2" style="fill:url(#statistics_77)" />
        <rect y="71.16" width="14" height="2" style="fill:#4dca59" />
        <g id="正常点-23">
          <path d="M7,47.16a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-1a7,7,0,1,0,7,7A7,7,0,0,0,7,46.16Z" style="fill:#4dca59" />
          <circle cx="7" cy="53.16" r="3" style="fill:#4dca59" />
        </g>
        <text transform="translate(24 58.16)" style="isolation:isolate;font-size:12px;fill:#ccc">正常站点</text>
        <text transform="translate(95.48 61.16)" style="isolation:isolate;font-size:20px;fill:#4dca59;font-family:ArialMT, Arial">{{ normalNumber }}</text>
        <rect y="77.16" width="120" height="40" style="fill:#f43b42;fill-opacity:0" />
        <rect y="115.16" width="120" height="2" style="fill:url(#statistics_78)" />
        <rect y="115.16" width="14" height="2" style="fill:#f43b42" />
        <g id="正常点-24">
          <path d="M7,91.16a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-1a7,7,0,1,0,7,7A7,7,0,0,0,7,90.16Z" style="fill:#f43b42" />
          <circle cx="7" cy="97.16" r="3" style="fill:#f43b42" />
        </g>
        <text transform="translate(24 102.16)" style="isolation:isolate;font-size:12px;fill:#ccc">告警站点</text>
        <text transform="translate(95.48 105.16)" style="isolation:isolate;font-size:20px;fill:#f43b42;font-family:ArialMT, Arial">{{ abnormalNumber }}</text>
      </g>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 423.5 40"
      style="height: 29px; position: absolute; left: 50%;transform: translateX(-50%); z-index: 99;"
    >
      <defs>
        <linearGradient id="linear-gradient-staqyxts" x1="212.5" y1="40" x2="212.5" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#4196ff" stop-opacity="0.5" />
          <stop offset="1" stop-color="#4196ff" stop-opacity="0" />
        </linearGradient>
      </defs>
      <g id="图层_2" data-name="图层 2">
        <g id="内容">
          <polygon points="161.68 39.5 157 35.76 157 5.21 161.71 0.5 183.29 0.5 188 5.21 188 35.76 183.32 39.5 161.68 39.5" style="fill:#171e28;opacity:0.8" />
          <path d="M183.09,1l4.41,4.41V35.52L183.15,39h-21.3l-4.35-3.48V5.41L161.91,1h21.17m.41-1h-22l-5,5V36l5,4h22l5-4V5l-5-5Z" style="fill:#27558e" />
          <polygon points="201.68 39.5 197 35.76 197 5.21 201.71 0.5 223.29 0.5 228 5.21 228 35.76 223.32 39.5 201.68 39.5" style="fill:#171e28;opacity:0.8" />
          <path d="M223.09,1l4.41,4.41V35.52L223.15,39h-21.3l-4.35-3.48V5.41L201.91,1h21.17m.41-1h-22l-5,5V36l5,4h22l5-4V5l-5-5Z" style="fill:#27558e" />
          <polygon points="241.68 39.5 237 35.76 237 5.21 241.71 0.5 263.29 0.5 268 5.21 268 35.76 263.32 39.5 241.68 39.5" style="fill:#171e28;opacity:0.8" />
          <path d="M263.09,1l4.41,4.41V35.52L263.15,39h-21.3l-4.35-3.48V5.41L241.91,1h21.17m.41-1h-22l-5,5V36l5,4h22l5-4V5l-5-5Z" style="fill:#27558e" />
          <polygon points="281.68 39.5 277 35.76 277 5.21 281.71 0.5 303.29 0.5 308 5.21 308 35.76 303.32 39.5 281.68 39.5" style="fill:#171e28;opacity:0.8" />
          <path d="M303.09,1l4.41,4.41V35.52L303.15,39h-21.3l-4.35-3.48V5.41L281.91,1h21.17m.41-1h-22l-5,5V36l5,4h22l5-4V5l-5-5Z" style="fill:#27558e" />
          <polygon points="321.68 39.5 317 35.76 317 5.21 321.71 0.5 343.29 0.5 348 5.21 348 35.76 343.32 39.5 321.68 39.5" style="fill:#171e28;opacity:0.8" />
          <path d="M343.09,1l4.41,4.41V35.52L343.15,39h-21.3l-4.35-3.48V5.41L321.91,1h21.17m.41-1h-22l-5,5V36l5,4h22l5-4V5l-5-5Z" style="fill:#27558e" />
          <polygon points="361.68 39.5 357 35.76 357 5.21 361.71 0.5 383.29 0.5 388 5.21 388 35.76 383.32 39.5 361.68 39.5" style="fill:#171e28;opacity:0.8" />
          <path d="M383.09,1l4.41,4.41V35.52L383.15,39h-21.3l-4.35-3.48V5.41L361.91,1h21.17m.41-1h-22l-5,5V36l5,4h22l5-4V5l-5-5Z" style="fill:#27558e" />
          <rect x="2.5" y="30" width="420" height="10" style="fill:url(#linear-gradient-staqyxts)" />
          <text transform="translate(166.36 30)" style="font-size:24px;fill:aqua;font-family:LCDUltra, LCDUltra">{{ safeDaysList[0] }}</text>
          <text transform="translate(206.34 30)" style="font-size:24px;fill:aqua;font-family:LCDUltra, LCDUltra">{{ safeDaysList[1] }}</text>
          <text transform="translate(246.34 30)" style="font-size:24px;fill:aqua;font-family:LCDUltra, LCDUltra">{{ safeDaysList[2] }}</text>
          <text transform="translate(286.34 30)" style="font-size:24px;fill:aqua;font-family:LCDUltra, LCDUltra">{{ safeDaysList[3] }}</text>
          <text transform="translate(326.34 30)" style="font-size:24px;fill:aqua;font-family:LCDUltra, LCDUltra">{{ safeDaysList[4] }}</text>
          <text transform="translate(366.34 30)" style="font-size:24px;fill:aqua;font-family:LCDUltra, LCDUltra">{{ safeDaysList[5] }}</text>
          <text transform="translate(0 29.12)" style="font-size:24px;fill:#fff;font-weight:700">系统安全运行</text>
          <text transform="translate(399.5 29.12)" style="font-size:24px;fill:#fff;font-weight:700">天</text>
        </g>
      </g>
    </svg>
    <!-- img标签出来的图不完整 所以换background-url background-reapt object-fit: contain不支持 -->
<!--   <img v-show="showImg" @load="showImg = true" :src="gdMap.propValue" :style="{transform: `scale(${scale(w, 870)}, ${scale(h - 100,560)})`}" style="position: absolute;top: 100px;width: 870px;height: 560px;transform-origin: left top"/>-->
   <!-- <div id="img" :style="{backgroundImage: `url(${gdMap.propValue})`, transform: `scale(${scale(w, 870)}, ${scale(h - 100,560)})`}" style="position: absolute;top: 100px;width: 870px;height: 560px;transform-origin: left top"></div> -->
<!--    background-url出来的截图还是不行 会变大 用canvas可以-->
     <canvas ref="canvas" width="870" height="560" :style="{transform: `scale(${scale(w, 870)}, ${scale(h - 100,560)})`}" style="position: absolute;top: 100px;width: 870px;height: 560px;transform-origin: left top"></canvas>
<!--    用canvas也不行 只能截图单个地图 加别的好像就不行 有时可以有时不行?-->
    <div :style="{transform: `scale(${scale(w, 870)}, ${scale(h - 100,560)})`}" style="position: absolute;top: 100px;width: 870px;height: 560px;transform-origin: left top">
      <div
        v-for="(item, i) in point"
        :key="i"
        style="position: absolute;"
        :style="{top: `${pxToPercentTop(item.style.top + 20, 911)}`,left: `${pxToPercentLeft(item.style.left - 230, 1400)}`,}"
      >
        <!-- svg加绝对定位时 四个方位都要写全 只写left top就不行 -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          @click="pointJump(item)"
          style="cursor:pointer;outline: none;width: 22px;height: 22px;"
        >
          <g transform="translate(0, 0) scale(1, 1)">
          <g>
            <circle cx="11" cy="11" r="6.5" style="fill:#4dca59;opacity:0.5;isolation:isolate"></circle>
            <path d="M11,5a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-1a7,7,0,1,0,7,7A7,7,0,0,0,11,4Z" style="fill:#4dca59"></path>
            <g style="opacity:0.5">
              <path d="M11,1A10,10,0,1,1,1,11,10,10,0,0,1,11,1m0-1A11,11,0,1,0,22,11,11,11,0,0,0,11,0Z" style="fill:#4dca59"></path>
            </g>
            <circle cx="11" cy="11" r="3" style="fill:#4dca59"></circle>
          </g>
        </g>
        </svg>
      </div>
      <div
        v-for="(item, i) in text"
        :key="i"
        style="position: absolute;color: #fff;"
        :style="{top: `${pxToPercentTop(item.style.top + 20, 911)}`, left: `${pxToPercentLeft(item.style.left - 220, 1400)}`}"
      >
        {{item.propValue}}
      </div>
    </div>
  </div>
  <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;" v-else>
    <img src="@/assets/images/exception/nodata.svg" style="width: 100%;height: 30%" alt="">
    <div style="color: #fff;text-align: center;font-size: 40px;">请输入地图ID</div>
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted, nextTick, ref, computed } from 'vue'
import type { Ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { publicInterface } from '@/api/path/business.api'
import { isPreview } from '@/utils'
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {RequestHttpIntervalEnum} from "@/enums/httpEnum";
import { useOriginStore } from '@/store/modules/originStore/originStore'
import moment from 'moment'
import { debounce } from "lodash";
import { postMessageToParent } from '@/utils/utils'

const showImg = ref(false)

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
// Object.assign(props.chartConfig.attr, { w: 870, h: 560 })

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

const originStore = useOriginStore()
const systemConfig = originStore.getOriginStore.user.systemConfig

const scale = (a:number, b:number) => {
  return a / b
}
const pxToPercentLeft = (left:number, w:number) => {
  return `calc(${left * 100 / w}% - 11px)`
}
const pxToPercentTop = (top:number, h:number) => {
  return `calc(${top * 100 / h}% - 11px)`
}
let gdMap: { [k: string]: any } = reactive({})
let text: { style: { [k: string]: any }, propValue: string }[] = reactive([])
let point: { color: string, node_status: number, style: { [k: string]: any } }[] = reactive([])

const allNumber = computed(() => point.length)
const normalNumber = computed(() => point.filter(_ => _.color !== '#f00').length)
const abnormalNumber = computed(() => point.filter(_ => _.color === '#f00').length)

let safeDaysList = reactive(['0', '0', '0', '0', '0', '0'])

const canvas = ref() as Ref<HTMLCanvasElement>
const getData = () => {
  safeDaysList.splice(0, safeDaysList.length, ...(moment().diff(moment(systemConfig.overview_dglt_idc_operation_date), 'days') + 1).toString().padStart(6, '0').split(''))
  if(!props.chartConfig.customData!.mapId) return
  publicInterface('/dcim/space_page', 'get_one_no_permission', { id: props.chartConfig.customData!.mapId }).then(res => {
    if(res && res.data){
      const arr:[] = JSON.parse(res.data.canvas_data)
      for (const key in gdMap) delete gdMap[key]
      Object.assign(gdMap, arr.find((_:any) => _.component === 'Picture') || {})
      if(canvas.value){
        const ctx = canvas.value.getContext('2d');
        ctx?.clearRect(0, 0, canvas.value.width, canvas.value.height);
        const img = new Image();
        img.onload = function() {
          if(ctx) ctx.drawImage(img, 0, 0, canvas.value.width, canvas.value.height);
        };
        img.src = gdMap.propValue;
      }
      text.splice(0, text.length, ...arr.filter((_:any) => _.component === 'v-text'))
      point.splice(0, point.length, ...arr.filter((_:any) => _.component === 'svg-shape'))
      const activeAlarmData = {
          levels: [],
          confirm_statuses: []
      }
      if (systemConfig.active_alarm_confirm_status) {
        activeAlarmData.confirm_statuses.splice(0, activeAlarmData.confirm_statuses.length, ...JSON.parse(systemConfig.active_alarm_confirm_status) as [])
      }
      if (systemConfig['active_alarm_level']) {
        for (let i = 0; i < Number(systemConfig['active_alarm_level']); i++) {
          (activeAlarmData.levels as number[]).push(i + 1)
        }
      }
      const param = {
        ids: point.filter((_:any) => _.dataBind.monitorIds.length).map((_:any) => Number(_.dataBind.monitorIds[0])),
        ...activeAlarmData,
      }
      const idMap:{[k:string]: number} = {}
      param.ids.forEach((item, i) => {
        idMap[item] = i
      })
      publicInterface('/dcim/dems/device', 'get_space_tree_with_status_v3', param).then(res => {
        if(res && res.data) {
          res.data.forEach((item:any) => {
            if(item.node_status !== 0) {
              point[idMap[item.id]].color = '#f00'
            }
          })
        }
      })
    }
  })
}

const pointJump = (item:any) => {
  postMessageToParent({type: 'changeRouterV1', url: '/' + item.dataBind.skipPath})
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
const fn = debounce(() => {
  getData()
}, 1000)
watch(() => props.chartConfig.customData!.mapId, fn)

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
.box{
  position: relative;
}
</style>
