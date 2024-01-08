<template>
  <BorderBox :title="props.chartConfig.customData.title" :style="getStyle(borderRadius)" style="overflow: visible">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 401 236" style="width: 100%;height: 100%">
      <defs>
        <linearGradient id="linear-gradient-compute-node" x1="99" y1="176" x2="99" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="aqua" stop-opacity="0.3" />
          <stop offset="1" stop-color="aqua" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient id="linear-gradient-compute-node-2" x1="301" y1="176" x2="301" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#999" stop-opacity="0.3" />
          <stop offset="1" stop-color="#999" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient id="linear-gradient-compute-node-3" x1="99" y1="236" x2="99" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#f43b42" stop-opacity="0.3" />
          <stop offset="1" stop-color="#f43b42" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient id="linear-gradient-compute-node-4" x1="301" y1="236" x2="301" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#f5b442" stop-opacity="0.3" />
          <stop offset="1" stop-color="#f5b442" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient id="linear-gradient-compute-node-5" x1="1" y1="100" x2="401" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#4196ff" stop-opacity="0.1" />
          <stop offset="1" stop-color="#4196ff" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="linear-gradient-compute-node-6" x1="1" y1="115.5" x2="21" y2="115.5" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#4196ff" stop-opacity="0" />
          <stop offset="1" stop-color="#4196ff" />
        </linearGradient>
      </defs>
      <g>
        <rect y="120" width="198" height="56" style="fill:url(#linear-gradient-compute-node)" />
        <!-- <text transform="translate(160 155.6)" style="font-size:20px;fill:aqua;font-family:SourceHanSansCN-Bold, SourceHanSansCN Bold-GBpc-EUC-H;font-weight:700">{{ computeNodeData.sever_count }}</text> -->
        <text transform="translate(160 155.6)" style="font-size:20px;fill:aqua;font-weight:700">{{ computeNodeData.sever_count }}</text>
        <rect y="174" width="198" height="2" style="fill:aqua" />
        <text transform="translate(28 152)" style="font-size:12px;fill:#fff;font-family:PingFang-SC-Regular, PingFang SC-Regular">服务总数</text>
        <rect x="6" y="140" width="16" height="16" style="fill:#fff;opacity:0" />
        <path d="M14,142a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-1a7,7,0,1,0,7,7,7,7,0,0,0-7-7Z" style="fill:#fff" />
        <polyline points="20 148 14 148 14 142" style="fill:none;stroke:#fff;stroke-miterlimit:10" />
        <rect x="202" y="120" width="198" height="56" style="fill:url(#linear-gradient-compute-node-2)" />
        <text transform="translate(362 155.6)" style="font-size:20px;fill:#999;font-weight:700">{{ computeNodeData.offline_server_count }}</text>
        <rect x="202" y="174" width="198" height="2" style="fill:#999" />
        <text transform="translate(230 152)" style="font-size:12px;fill:#fff;font-family:PingFang-SC-Regular, PingFang SC-Regular">离线服务</text>
        <rect x="208" y="140" width="16" height="16" style="fill:#fff;opacity:0" />
        <line x1="219" y1="149" x2="213" y2="155" style="fill:none;stroke:#fff;stroke-miterlimit:10" />
        <line x1="213" y1="149" x2="219" y2="155" style="fill:none;stroke:#fff;stroke-miterlimit:10" />
        <path d="M216,144a5,5,0,0,0-4.65,3.18l.93.36a4,4,0,0,1,7.43,0l.93-.36A5,5,0,0,0,216,144Z" style="fill:#fff" />
        <path d="M216,141a8,8,0,0,0-7.45,5.09l.93.36a7,7,0,0,1,13,0l.93-.36A8,8,0,0,0,216,141Z" style="fill:#fff" />
        <rect y="180" width="198" height="56" style="fill:url(#linear-gradient-compute-node-3)" />
        <text transform="translate(165 215.6)" style="font-size:20px;fill:#f43b42;font-weight:700">{{ computeNodeData.busy_server_count }}</text>
        <rect y="234" width="198" height="2" style="fill:#f43b42" />
        <text transform="translate(28 212)" style="font-size:12px;fill:#fff;font-family:PingFang-SC-Regular, PingFang SC-Regular">拥堵服务</text>
        <rect x="6" y="200" width="16" height="16" style="fill:#fff;opacity:0" />
        <path d="M14,202a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-1a7,7,0,1,0,7,7,7,7,0,0,0-7-7Z" style="fill:#fff" />
        <line x1="21" y1="208" x2="7" y2="208" style="fill:none;stroke:#fff;stroke-miterlimit:10" />
        <line x1="21" y1="208" x2="10" y2="203" style="fill:none;stroke:#fff;stroke-miterlimit:10" />
        <line x1="21" y1="208" x2="10" y2="213" style="fill:none;stroke:#fff;stroke-miterlimit:10" />
        <rect x="202" y="180" width="198" height="56" style="fill:url(#linear-gradient-compute-node-4)" />
        <text transform="translate(367 215.6)" style="font-size:20px;fill:#f5b442;font-weight:700">{{ computeNodeData.loss_server_count }}</text>
        <rect x="202" y="234" width="198" height="2" style="fill:#f5b442" />
        <text transform="translate(230 212)" style="font-size:12px;fill:#fff;font-family:PingFang-SC-Regular, PingFang SC-Regular">缺失服务</text>
        <rect x="208" y="200" width="16" height="16" style="fill:#fff;opacity:0" />
        <path d="M216,202a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-1a7,7,0,1,0,7,7,7,7,0,0,0-7-7Z" style="fill:#fff" />
        <line x1="220.95" y1="203.05" x2="211.05" y2="212.95" style="fill:none;stroke:#fff;stroke-miterlimit:10" />
        <rect x="1" y="84" width="400" height="32" style="fill:url(#linear-gradient-compute-node-5)" />
        <rect x="1" y="115" width="20" height="1" style="fill:url(#linear-gradient-compute-node-6)" />
        <text transform="translate(11 105)" style="font-size:14px;fill:#fff;font-family:PingFang-SC-Bold, PingFang SC-Bold;font-weight:700">计算节点服务统计</text>
        <rect x="1" width="400" height="68" style="fill:#4196ff;fill-opacity:0.08" />
        <rect x="101" y="14" width="1" height="40" style="fill:#4196ff;fill-opacity:0.08" />
        <rect x="201" y="14" width="1" height="40" style="fill:#4196ff;fill-opacity:0.08" />
        <rect x="301" y="14" width="1" height="40" style="fill:#4196ff;fill-opacity:0.08" />
        <text transform="translate(27 30)" style="font-size:20px;fill:aqua;font-weight:700">{{ computeNodeData.node_count }}</text>
        <text transform="translate(27 51)" style="font-size:12px;fill:#fff;font-family:PingFang-SC-Regular, PingFang SC-Regular">计算节点</text>
        <text transform="translate(133 51)" style="font-size:12px;fill:#fff;font-family:PingFang-SC-Regular, PingFang SC-Regular">待更新</text>
        <text transform="translate(227 51)" style="font-size:12px;fill:#fff;font-family:PingFang-SC-Regular, PingFang SC-Regular">异常节点</text>
        <text transform="translate(327 51)" style="font-size:12px;fill:#fff;font-family:PingFang-SC-Regular, PingFang SC-Regular">异常服务</text>
        <text transform="translate(133 30)" style="font-size:20px;fill:#fff;font-weight:700">{{ computeNodeData.need_updated_count }}</text>
        <text transform="translate(228 30)" style="font-size:20px;fill:#f43b42;font-weight:700">{{ computeNodeData.abnormal_count }}</text>
        <text transform="translate(327 30)" style="font-size:20px;fill:#fc8358;font-weight:700">{{ computeNodeData.abnormal_server_count }}</text>
      </g>
    </svg>
  </BorderBox>
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

const computeNodeData:{[k:string]: number} = reactive({
  abnormal_count: 0,
  abnormal_server_count: 0,
  busy_server_count: 0,
  loss_server_count: 0,
  need_updated_count: 0,
  node_count: 0,
  offline_server_count: 0,
  sever_count: 0
})
const getData = () => {
  publicInterface('/dcim/dems/statistic', 'count_node', {}).then(res => {
    if (res && res.data) {
      for (const key in computeNodeData) {
        computeNodeData[key] = res.data[key]
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
