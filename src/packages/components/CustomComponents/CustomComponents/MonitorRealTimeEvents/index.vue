<template>
  <div :style="getStyle(borderRadius)" style="overflow: visible">
    <BorderBox
      :title="chartConfig?.customData?.title"
      v-model:checkAll="checkAll"
      @clickBatch="clickBatch('batch')"
      @jumpMore="jumpMore"
    >
      <div class="itemBox">
        <div class="item" v-for="(item, i) in tableData" :key="i">
          <div class="row1">
            <n-checkbox :disabled="item.confirm_status === 'ok'" v-model:checked="item.checked" class="mr10" size="small" @click.stop/>
            <n-tag class="mr5" size="small" strong :color="{textColor: '#000', color: item.confirm_status === 'ok' ? '#4DCA59' : '#f5b442'}">
              {{ item.confirm_status === 'ok'?'已确认':'未确认' }}
            </n-tag>
            <n-tag class="mr5" size="small" :color="{textColor: levelToOption(item.level).remark, borderColor: levelToOption(item.level).remark}">
              {{levelToOption(item.level).label}}
            </n-tag>
            <div class="content">{{ item.content }}</div>
          </div>
          <div class="row2">
            <div class="mr10 nowrap" style="color: #B5BAC3;">{{ moment(item.generate_time).format('yyyy-MM-DD HH:mm:ss') }}</div>
            <div style="flex: 1;"></div>
          <CheckCircleOutlinedIcon @click="clickBatch('single', item.id)" style="width: 20px;height: 20px;color: #4196ff;"/>
          </div>
        </div>
      </div>
    </BorderBox>
    <VModalV1 v-model:show="modalV1Obj.show" :data="modalV1Obj.data" @confirm="confirm"/>
  </div>
</template>

<script setup lang="ts">
import { PropType, watch, toRefs, reactive, onMounted, onUnmounted, nextTick, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { publicInterface } from '@/api/path/business.api'
import BorderBox from './BorderBoxV2.vue'
import {isPreview, postMessageToParent} from '@/utils'
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {RequestHttpIntervalEnum} from "@/enums/httpEnum";
import {icon} from "@/plugins";
import moment from 'moment'
import { useOriginStore } from '@/store/modules/originStore/originStore'
import VModalV1 from './VModalV1.vue'

const { CheckCircleOutlinedIcon } = icon.material

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

if(!isPreview()){
  Object.assign(props.chartConfig.attr, { w: 450, h: 300 })
  Object.assign(props.chartConfig.request, { requestInterval: 15, requestIntervalUnit: RequestHttpIntervalEnum.SECOND })
}

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

const originStore = useOriginStore()
const user = originStore.getOriginStore.user.user
const modalV1Obj = reactive({
  show: false,
  data: {
    confirm_people: user.name,
    is_misreport: false,
    remark: '',
    reconfirmation_time_str: null,
  },
  // batch 批量 single 单个
  type: 'batch',
  singleIds: [],
})
const clickBatch = (type = 'batch', id?:number) => {
  if(type === 'batch' && !tableData.filter(_ => _.checked).length) {
    window['$message'].warning('请先选择数据')
    return
  }
  let singleIds:number[] = []
  if(type === 'single' && id) singleIds = [id]
  Object.assign(modalV1Obj, {
    show: true,
    data: {
      confirm_people: user.name,
      is_misreport: false,
      remark: '',
      reconfirmation_time_str: null,
    },
    type,
    singleIds
  })
}
const confirm = () => {
  const obj = {
    id: null,
    ids: modalV1Obj.type === 'batch' ? tableData.filter(_ => _.checked).map(_ => _.id) : modalV1Obj.singleIds,
    confirm_status: "ok",
    ...modalV1Obj.data
  }
  publicInterface('/dcim/dems/devie_active_alarm', 'confirms', obj).then(res => {
    window['$message'].success('操作成功')
    checkAll.value = false
    getData()
  })
}


const jumpMore = () => {
  postMessageToParent({
    type: 'changeRouterV1',
    url: `/alarmManage/monitorAlarm`
  })
}
type tableDataItemType = {
  id: number,
  content: string,
  generate_time: string,
  checked: boolean,
  confirm_status: 'ok' | 'not',
  level: number
}

let tableData:tableDataItemType[] = reactive([])
watch(() => tableData.map(_ => _.checked), (v:boolean[]) => {
  if(!v.length) checkAll.value = false
  else if(v.every(_ => _)) checkAll.value = true
  else if(v.every(_ => !_)) checkAll.value = false
})

let checkAll = ref(false)
watch(() => checkAll.value, (v) => {
  tableData.forEach(_ => _.checked = v)
})

type levelItem = { [k:string]: string | number }
const warnLevelOption = originStore.getOriginStore.user.systemConstant['warn_levels'].filter((item: levelItem) => item.value !== '').map((item: levelItem) => {
  return { label: item.label, value: Number(item.value), remark: item.remark }
})

const levelToOption = (level:number) => {
  return warnLevelOption.find((_:levelItem) => _.value === level) || { label: '其他', remark: '#989898' }
}

const getData = () => {
  const queryModel = {
    condition: {
      id: null,
      levels: [],
      confirm_statuss: ['not'],
      trigger_source: 1 // 1：IOT服务告警，0：设备测点告警
    },
    page: {
      page_size: 6,
      page_number: 1
    }
  }
  publicInterface('/dcim/dems/devie_active_alarm', 'get_page', queryModel).then(res => {
    if(res && res.data && res.data.item) {
      const lastTableData = [...tableData]
      tableData.splice(0, tableData.length, ...res.data.item.map((e:any) => ({ ...e, checked: false })))
      if (checkAll.value) {
        tableData.splice(0, tableData.length, ...tableData.map(e => ({ ...e, checked: e.confirm_status !== 'ok' })))
      } else if (lastTableData.length) {
        tableData.forEach(e => {
          const lastIndex = lastTableData.findIndex(item => item.id === e.id)
          if (lastIndex !== -1) {
            e.checked = lastTableData[lastIndex].checked
          }
        })
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
.mr5{
  margin-right: 5px;
}
.mr10{
  margin-right: 10px;
}
.nowrap{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.itemBox{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .item{
    flex: none;
    height: 60px;
    padding: 5px 10px;
    box-sizing: border-box;
    margin: 3px 0;
    background: rgba(65,150,255,.05);
    cursor: pointer;
    .row1{
      display: flex;
      align-items: center;
      .content{
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.82)
      }
    }
    .row2{
      margin-top: 8px;
      display: flex;
      align-items: center;
      font-size: 12px;
    }
  }
}
</style>
