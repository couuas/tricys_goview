<template>
  <div style="overflow: visible;">
    <BorderBox :title="customData?.title">
      <div class="contentBox">
        <div class="row">
          <div class="col">排序</div>
          <div class="col">区域设备</div>
          <div class="col">实时温度</div>
        </div>
        <div class="row" v-for="(it, i) in data" :key="i">
          <div class="col col1">{{i + 1}}</div>
          <div class="col col1" :title="`${it.space_complete_name}/${it.node_name}`">
            {{ getAreaName(it.space_complete_name) }}<span v-if="getAreaName(it.space_complete_name)">/</span>{{ it.node_name }}
          </div>
          <div class="col col1">
            <div class="value">{{it.dems_device_point.node_value}}</div>
            <LocationIcon @click.stop="jumpToMachineRoom(it)" class="icon" style="margin-left: 5px;cursor: pointer;width: 16px;height: 16px;color: #4196ff;"/>
          </div>
        </div>
      </div>
    </BorderBox>
  </div>
</template>

<script setup lang="ts">
import BorderBox from '../components/BorderBox.vue'
import {computed, PropType, Ref, onMounted, ref, watch, onUnmounted} from "vue";
import { customData as customDataConfig } from './config'
import { CreateComponentType } from '@/packages/index.d'
import { publicInterface } from '@/api/path/business.api'
import {isPreview, postMessageToParent} from '@/utils'
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {useOriginStore} from "@/store/modules/originStore/originStore";
import {icon} from "@/plugins";

const { LocationIcon } = icon.carbon

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const customData: Ref<typeof customDataConfig> = computed(() => {
  return props.chartConfig.customData as typeof customDataConfig
})

let data:Ref<any> = ref([])

const getAreaName = (name: any) => {
  name = name.split('/')
  if (name.length) {
    name = name.pop()
  }
  return name
}

const jumpToMachineRoom = (row: any) => {
  if (row.space && row.space.space_type !== 'device') {
    publicInterface('/dcim/space_page', 'get', { space_id: row.space_id, order: 'sort,id asc' }).then((res: any) => {
      if (res.data.length) {
        postMessageToParent({
          type: 'changeRouterV1',
          url: `/dynamicRing/schematicDiagram/${res.data[0].id}`
        })
      } else {
        window['$message'].warning('所选节点没有配置页面')
      }
    })
  } else {
    window['$message'].warning('所选节点没有配置页面')
  }
}

const getData = () => {
  const params = {
    signal_ids: customData.value.ids.split(',')
  }
  publicInterface('/dcim/dems/device_point', 'temp_list_dashboard', params).then((res: any) => {
    if (res.data && res.data.length) {
      data.value = res.data.slice(0, 10)
      console.log(data.value, 777)
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

</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
  .contentBox{
    width: 100%;
    height: 100%;
    padding: 0 5px;
    overflow: auto;
    .row{
      display: flex;
      background: rgba(65, 150, 255, 0.08);
      color: #999;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      padding-left: 10px;
      margin-bottom: 5px;
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
      .col{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &:nth-child(1) {
          flex: none;
          width: 40px;
        }
        &:nth-child(2) {
          flex: 1;
          min-width: 100px;
        }
        &:nth-child(3) {
          flex: none;
          width: 80px;
        }
      }
      .col1{
        color: #fff;
        display: flex;
        align-items: center;
        &:nth-child(3) {
          color: rgb(0, 255, 255);
          .value{
            width: 49px;
          }
        }
      }
    }
  }
}
</style>