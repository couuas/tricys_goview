<template>
  <div style="overflow: visible;">
    <BorderBox :title="customData?.title">
      <div class="box">
        <div class="legend">
          <div class="rect green"></div>
          <div class="label">在线</div>
          <div class="rect red"></div>
          <div class="label">告警</div>
          <div class="rect"></div>
          <div class="label">离线</div>
        </div>
        <div class="bottomBox">
          <div @click.stop="openDialog(it)" class="item" v-for="(it, i) in systemDatas" :key="i">
            <div class="row1">{{it.label}}</div>
            <div class="row2">
              <div class="col">{{it.online_num}}</div>
              <div class="col">{{it.alarm_num}}</div>
              <div class="col">{{it.offline_num}}</div>
            </div>
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


const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const customData: Ref<typeof customDataConfig> = computed(() => {
  return props.chartConfig.customData as typeof customDataConfig
})

const deepGetAllDeviceCodes = (treeData: any):any => {
  // 递归深度遍历获取设备分类编码数组
  let device_codes = []
  if (treeData?.data?.code) {
    device_codes.push(treeData.data.code)
  }
  if (treeData.children) {
    for (let i = 0; i < treeData.children.length; i++) {
      device_codes = device_codes.concat(deepGetAllDeviceCodes(treeData.children[i]))
    }
  }
  return device_codes
}

let systemDatas:Ref<any> = ref([])
// const originStore = useOriginStore()
// const systemConfig = originStore.getOriginStore.user.systemConfig

const getData = async() => {
  try {
    const res:any = await publicInterface('/dcim/dems/device_type', 'tree', {})
    if (res.data && res.data.length) {
      systemDatas.value = res.data.map((e: any) => {
        const device_codes = deepGetAllDeviceCodes(e)
        return {
          ...e,
          device_code: e.data.code,
          device_codes,
          all: 0,
          online_num: 0,
          alarm_num: 0,
          offline_num: 0
        }
      })
      let config: any = []
      try {
        config = JSON.parse(customData.value.config)
      } catch (e) {
        console.log(e)
      }
      if (config && config.length) {
        // 如果配置了展示的设备分类（不配置默认全部）
        systemDatas.value = systemDatas.value.filter((e: any) => {
          return config.find((v: any) => v.code === e.device_code)
        })
      }
      const params = {
        levels: [1, 2, 3],
        // confirm_statuss: ['not'],
        recovery_statuss: ['not'],
        space_complete_id: '',
        device_codes: systemDatas.value.map((e: any) => e.device_code)
      }
      publicInterface('/dcim/dems/device', 'count_num_and_alarm_num_by_type', params).then((res1: any) => {
        if (res1.data && res1.data.length) {
          for (const i in res1.data) {
            const item = systemDatas.value.find((e: any) => e.device_code === res1.data[i].device_code)
            if (item) {
              item.all = res1.data[i].all
              item.online_num = res1.data[i].all - res1.data[i].alarm_num - res1.data[i].offline_num
              item.alarm_num = res1.data[i].alarm_num
              item.offline_num = res1.data[i].offline_num
            }
          }
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const openDialog = (item: any) => {
  postMessageToParent({
    type: 'openDeviceStatusDialog',
    data: item
  })
}

watch(() => customData.value.config, getData)

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
  .legend{
    position: absolute;
    right: 0;
    top: -34px;
    display: flex;
    align-items: center;
    .rect{
      margin-left: 10px;
      margin-right: 5px;
      width: 10px;
      height: 10px;
      background: #989898;
      &.green{
        background: #4ac95b;
      }
      &.red{
        background: #f33b41;
      }
    }
    .label{
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      color: #ccc;
    }
  }
  .bottomBox{
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 20px);
    align-content: space-around;
    padding: 10px;
    .item{
      margin-top: 10px;
      width: calc(50% - 10px);
      height: calc(50% - 10px);
      background: #142b42;
      cursor: pointer;
      &:nth-child(1), &:nth-child(2) {
        margin-top: 0;
      }
      &:nth-child(odd) {
        margin-right: 20px;
      }
      .row1{
        height: 50%;
        width: 100%;
        font-size: 12px;
        line-height: 30px;
        color: #fff;
        padding-left: 10px;
        display: flex;
        align-items: center;
      }
      .row2{
        height: 50%;
        width: 100%;
        display: flex;
        .col{
          flex: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 33.3%;
          height: 100%;
          font-size: 14px;
          color: #989898;
          border-bottom: 2px solid #989898;
          background-image: linear-gradient(to bottom, #98989800, #98989840);
          text-align: center;
          &:nth-child(1) {
            color: #4ac95b;
            border-bottom: 2px solid #4ac95b;
            background-image: linear-gradient(to bottom, #4ac95b00, #4ac95b40);
          }
          &:nth-child(2) {
            color: #f33b41;
            border-bottom: 2px solid #f33b41;
            background-image: linear-gradient(to bottom, #f33b4100, #f33b4140);
          }
        }
      }
    }
  }
}
</style>