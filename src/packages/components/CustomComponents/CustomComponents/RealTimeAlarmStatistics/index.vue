<template>
  <div :style="getStyle(borderRadius)">
    <BorderBox :title="props.chartConfig.customData.title">
      <div ref="echart7" class="box-5-item" style="width: 50%"></div>
      <v-chart
        ref="vChartRef"
        :option="option"
        :manual-update="false"
        :update-options="{
          replaceMerge: ['series', 'xAxis']
        }"
        autoresize
        style="overflow: visible;width: 50%"
      />
      <div class="box-5-item" style="width: 50%">
        <SvgAll v-bind="nameObj"/>
      </div>
    </BorderBox>
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted, ref } from 'vue'
import { requireErrorImg } from '@/utils'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import moment from 'moment'
import BorderBox from '../components/BorderBox.vue'
import SvgAll from './Svg.vue'
import {RequestHttpIntervalEnum} from "@/enums/httpEnum";
import {postMessageToParent, useGetMessageByParent} from '@/utils/utils'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

Object.assign(props.chartConfig.attr, {w: 380, h: 250})
Object.assign(props.chartConfig.request, { requestInterval: 15, requestIntervalUnit: RequestHttpIntervalEnum.SECOND })

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
  alarmLevels: []
})

const option = reactive({

})
postMessageToParent({type: 'getStore', data: 'user'})
// const userStore = reactive({})
const {getMessageByParent} = useGetMessageByParent()
getMessageByParent('getStore', (e) => {
  console.log(e)
})



</script>

<style lang="scss" scoped>
.Theme1{
  position: relative;
  .full-screen-btn {
    border: #4396fd 1px solid;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 10px;
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 9.6%;
    color: #4396fd;
    font-size: 14px;
    .full-screen {
      font-size: 16px;
      margin-right: 5px;
    }
  }
}
</style>
