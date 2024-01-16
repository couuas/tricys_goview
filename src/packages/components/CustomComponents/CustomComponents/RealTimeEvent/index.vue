<template>
  <BorderBox
    :title="chartConfig?.customData?.title"
    :select1="select1"
    @update:select1Value="v => select1.value = v"
    :select2="select2"
    @update:select2Value="v => select2.value = v"
    @clickBatch="clickBatch"
    v-model:checkAll="checkAll"
    @jumpMore="jumpMore"
    :showFilter="chartConfig?.customData?.showFilter"
    :style="getStyle(borderRadius)"
    style="overflow: visible"
  >
    <div v-if="tableData.length" class="itemBox">
      <div  class="item" v-for="(item, i) in tableData" :key="i" @click="clickItem(i)">
        <n-checkbox :disabled="item.confirm_status === 'ok'" v-model:checked="item.checked" class="mr10" size="small" @click.stop/>
        <n-tag class="mr5" size="small" strong :color="{textColor: '#000', color: item.confirm_status === 'ok' ? '#4DCA59' : '#f5b442'}">
          {{ item.confirm_status === 'ok'?'已确认':'未确认' }}
        </n-tag>
        <n-tag class="mr5" size="small" :color="{textColor: item.color1, borderColor: item.color1}">
          {{select1.options[item.level - 1].label}}
        </n-tag>
        <div class="textEllipsis" style="color: rgba(255, 255, 255, 0.82);">{{ item.content }}</div>
        <div style="flex: 1"></div>
        <div class="mr10 textEllipsis" style="color: #B5BAC3;">{{ moment(item.generate_time).format('yyyy-MM-DD HH:mm:ss') }}</div>
        <LocationIcon @click.stop="jumpTo(item)" class="mr10" style="width: 20px;height: 20px;color: #4196ff;"/>
        <CheckCircleOutlinedIcon @click.stop="clickSingle(item.id)" v-if="item.confirm_status === 'not'" style="width: 20px;height: 20px;color: #4196ff;"/>
        <div v-else style="width: 20px"></div>
      </div>
    </div>
    <div class="emptyBox" v-else>
      <img src="@/assets/images/exception/nodata.svg" style="width: 100%;height: 50%" alt="">
      <div style="color: #fff;text-align: center">查询结果为空</div>
    </div>
    <VModal v-model:show="modalObj.show" :data="modalObj.data" :select1Options="select1.options"/>
    <VModalV1 v-model:show="modalV1Obj.show" :data="modalV1Obj.data" @confirm="confirm"/>
  </BorderBox>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted, nextTick, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { publicInterface } from '@/api/path/business.api'
import BorderBox from './BorderBoxV2.vue'
import {isPreview, postMessageToParent} from '@/utils'
import moment from "moment"
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {RequestHttpIntervalEnum} from "@/enums/httpEnum";
import {icon} from '@/plugins/icon'
import VModal from './VModal.vue'
import VModalV1 from './VModalV1.vue'
import { useOriginStore } from '@/store/modules/originStore/originStore'

const { LocationIcon } = icon.carbon
const { CheckCircleOutlinedIcon } = icon.material

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

const select1 = reactive({
  value: [1, 2],
  options: [
    { label: '严重', value: 1, number: 0, color: '#ff0000' },
    { label: '主要', value: 2, number: 0, color: '#f43b42' },
    { label: '次要', value: 3, number: 0, color: '#fc8358' },
    { label: '警告', value: 4, number: 0, color: '#f8ca00' },
    { label: '事件', value: 5, number: 0, color: '#4fbadb' },
  ]
})

const select2 = reactive({
  value: ['not'],
  options: [
    { label: '已确认', value: 'ok', number: 0, color: '#4DCA59' },
    { label: '未确认', value: 'not', number: 0, color: '#f5b442' },
  ]
})

watch(() => select1.value.join('&&') + select2.value.join('&&'), (v) => {
  getData()
})

type tableDataItemType = {
  id: number,
  content: string,
  generate_time: string,
  checked: boolean,
  confirm_status: 'ok' | 'not',
  level: number,
  color1: string,
  color2: string,
  position: string,
  device_name: string,
  node_name: string,
  confirm_people: string,
  confirm_time: string,
  reconfirmation_time_str: string,
  serial_no: string,
  remark: string,
  [k:string]: any,
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

const getNumber = () => {
  publicInterface('/dcim/dems/devie_active_alarm', 'count_by_level', {}).then(res => {
    if (res && JSON.stringify(res.data) !== '{}') {
      select1.options.forEach((item, i) => {
        item.number = res.data[`level${i+1}`]
      })
    }
  })
  const param = {
    condition: {
      id: null,
      levels: select1.value,
      space_complete_id: '',
      append_space_to_content: 'complete',
      recovery_statuss: ['not'],
    }
  }
  publicInterface('/dcim/dems/devie_active_alarm', 'get_app_alarm_num_by_condition', param).then(res => {
    if (res && res.data) {
      select2.options[0].number = res.data['confrim_num']
      select2.options[1].number = res.data['not_confirm_num']
    }
  })
}

const getData = () => {
  getNumber()
  const queryModel = {
    condition: {
      id: null,
      levels: select1.value,
      confirm_statuss: select2.value,
      space_complete_id: '',
      append_space_to_content: 'complete',
      recovery_statuss: ['not'],
    },
    page: {
      page_size: 10,
      page_number: 1
    }
  }
  publicInterface('/dcim/dems/devie_active_alarm', 'get_page', queryModel).then(res => {
    if(res && !res.data) {
      tableData.splice(0)
      return
    }
    if(res && res.data) {
      res.data.item = res.data.item.filter((_: tableDataItemType) => _.level)
      const lastTableData = [...tableData]
      let arr:tableDataItemType[] = res.data['item'].map((e:any) => ({
        ...e,
        id: e.id,
        content: e.content,
        generate_time: e.generate_time,
        level: e.level,
        checked: false,
        confirm_status: e.confirm_status,
        color1: select1.options.find(_ => _.value === e.level)!.color,
        color2: select2.options.find(_ => _.value === e.confirm_status)!.color,
        position: e.position,
        device_name: e.device_name,
        node_name: e?.point?.node_name,
        confirm_people: e.confirm_people,
        confirm_time: e.confirm_time,
        reconfirmation_time_str: e.reconfirmation_time_str,
        serial_no: e.serial_no,
        remark: e.remark,
      }))
      if (checkAll.value) {
        arr = arr.map((e:any) => ({ ...e, checked: e.confirm_status !== 'ok' }))
      } else if (lastTableData.length) {
        arr.map(e => {
          const lastIndex = lastTableData.findIndex(item => item.id === e.id)
          if (lastIndex !== -1) {
            e.checked = lastTableData[lastIndex].checked
          }
        })
      }
      tableData.splice(0, tableData.length, ...arr)
    }
  })
}

const modalObj = reactive({
  show: false,
  data: {}
})
const clickItem = (i:number) => {
  const obj = tableData[i]
  modalObj.show = true
  Object.assign(modalObj, {
    show: true,
    data: obj
  })
}

const originStore = useOriginStore()
const user = originStore.getOriginStore.user.user
const modalV1Obj = reactive({
  show: false,
  data: {
    // confirm_people_id: user.id,
    confirm_people: user.name,
    is_misreport: false,
    remark: '',
    reconfirmation_time_str: null,
  },
  // batch 批量 single 单个
  type: 'batch',
  singleIds: [],
})
const clickBatch = () => {
  if(!tableData.filter(_ => _.checked).length) {
    window['$message'].warning('请先选择数据')
    return
  }
  Object.assign(modalV1Obj, {
    show: true,
    data: {
      // confirm_people_id: user.id,
      confirm_people: user.name,
      is_misreport: false,
      remark: '',
      reconfirmation_time_str: null,
    },
    type: 'batch',
    singleIds: []
  })
}
const clickSingle = (id: number) => {
  Object.assign(modalV1Obj, {
    show: true,
    data: {
      // confirm_people_id: user.id,
      confirm_people: user.name,
      is_misreport: false,
      remark: '',
      reconfirmation_time_str: null,
    },
    type: 'single',
    singleIds: [id]
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

const jumpTo = (row:any) => {
  if (row.space && row.space.space_type !== 'device') {
    publicInterface('/dcim/space_page', 'get', { space_id: row.space_id, order: 'sort,id asc' }).then(res => {
      if (res && res.data && res.data.length) {
        postMessageToParent({
          type: 'changeRouterV1',
          url: `/dynamicRing/schematicDiagram/${res.data[0].id}`
        })
      }
      else {
        window['$message'].warning('所选节点没有配置页面')
      }
    })
  }
  else {
    window['$message'].warning('所选节点没有配置页面')
  }
}

const jumpMore = () => {
  postMessageToParent({
    type: 'changeRouterV1',
    url: `/alarmManage/monitorAlarm`
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
.textEllipsis{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.emptyBox{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

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
    justify-content: center;
    padding: 0 10px;
    margin: 3px 0;
    background: rgba(65,150,255,.05);
    cursor: pointer;
  }
}
</style>
