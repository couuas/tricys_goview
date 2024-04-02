<template>
  <div :style="getStyle(borderRadius)">
    <BorderBox :title="chartConfig?.customData?.title">
      <div class="itemBox" :style="{'--color': elementColor}">
        <div class="item" v-for="(item, i) in list" :key="i">
          <div class="type">{{item.violation_data ? item.violation_data[0].scene_name : ''}}</div>
          <div class="time">{{item.event_time}}</div>
          <div class="device">{{item.ai_engine_name}}</div>
          <div class="camera">{{item.camera_name}}</div>
          <PlayCircle16FilledIcon class="btn" @click="openVideo(item)"/>
        </div>
      </div>
    </BorderBox>
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted, ref } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { publicInterface } from '@/api/path/business.api'
import BorderBox from '../components/BorderBox.vue'
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {isPreview, postMessageToParent, useGetMessageByParent} from "@/utils";
import {icon} from '@/plugins'
import { useDesignStore } from '@/store/modules/designStore/designStore'

const {PlayCircle16FilledIcon} = icon.fluent

const designStore = useDesignStore()
const elementColor = designStore.getAppTheme

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: ''
})

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

let showDialog = false
let currentVideo:any = {}
const {getMessageByParent} = useGetMessageByParent()
getMessageByParent('', (e) => {
  if(e.data.type === 'closeVideo' && e.data.page === 'customLargeScreen') {
    const {data}:{data:any} = e
    let query = {
      "id": currentVideo.id,
      "ai_engine_id": currentVideo.ai_engine_id,
      "has_read": true
    }
    publicInterface('/dcim/runhe_ai/event', 'mod', query)
    currentVideo = {}
    showDialog = false
    console.log(data)
  }
})

const openVideo = (item: any) => {
  currentVideo = item
  postMessageToParent({
    type: 'openVideo',
    data: item
  })
  showDialog = true
}

let list:any = ref([])
const getData = () => {
  publicInterface('/dcim/runhe_ai/event', 'get_current_page', {}).then(res => {
    if (res && res.data) {
      list.value = res.data
      if(!showDialog) {
        openVideo(res.data[0])
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
  clearInterval(timer as number)
})


// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.dataset = newData
})
</script>

<style lang="scss" scoped>
.itemBox{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .item{
    flex: none;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 10px;
    margin: 3px 0;
    background: rgba(65,150,255,.05);
    cursor: pointer;
    & > div{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-right: 10px;
      color: rgba(255, 255, 255, 0.82);
      &:nth-last-child(1) {
        padding-right: 0;
      }
    }
    .type{
      flex: 5;
      min-width: 100px;
    }
    .time{
      width: 180px;
      color: rgb(181, 186, 195);
    }
    .device{
      width: 100px;
    }
    .camera{
      width: 150px;
    }
    .btn{
      width: 20px;
      height: 20px;
      color: var(--color);
    }
  }
}
</style>
