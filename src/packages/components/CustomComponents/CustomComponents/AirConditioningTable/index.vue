<template>
  <div class="go-tables-basic" :style="{'--lineHeight': option.style.lineHeight + 'px'}">
    <n-input
      v-model:value="inputData"
      placeholder="请输入信息"
      :style="`display: ${inputShow}`"
      style="margin-bottom: 5px; float: right; width: 240px"
    >
      <template #prefix>
        <n-icon :component="SearchIcon" />
      </template>
    </n-input>
    <n-data-table
      style="box-sizing: border-box"
      row-class-name="custom-row"
      :style="`
      width: ${w}px;
      height: ${h}px;
      font-size: ${option.style.fontSize}px;
      border-width: ${option.style.border === 'on' ? option.style.borderWidth : 0}px;
      border-color: ${option.style.borderColor};
      border-style: ${option.style.borderStyle}`"
      :bordered="option.style.border === 'on'"
      :single-column="option.style.singleColumn === 'on'"
      :single-line="option.style.singleLine === 'on'"
      :bottom-bordered="option.style.bottomBordered === 'on'"
      :striped="option.style.striped === 'on'"
      :max-height="h"
      size="small"
      :columns="columns"
      :data="filterData"
      :pagination="pagination.show ? pagination : false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, toRefs, watch, reactive, ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { icon } from '@/plugins'
import {useChartCommonData} from "@/hooks";
import {useChartEditStore} from "@/store/modules/chartEditStore/chartEditStore";
import { isPreview } from '@/utils'
import { cloneDeep } from 'lodash'
import {publicInterface} from "@/api/path";
import { useOriginStore } from '@/store/modules/originStore/originStore'
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {CustomDataType} from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { SearchIcon } = icon.ionicons5

const { pagination, inputShow } = toRefs(props.chartConfig.option)

pagination.value.onChange = (page: number) => {
  pagination.value.page = page
}

const { w, h } = toRefs(props.chartConfig.attr)

const option = reactive({
  dataset: props.chartConfig.option.dataset,
  style: props.chartConfig.option.style,
  header: props.chartConfig.option.header
})

watch(() => props.chartConfig.option.header, v => {
  option.header = v
}, {
  immediate: true,
  deep: true
})

let originData:any = ref({})

const customData = computed(() => {
  return props.chartConfig.customData as CustomDataType
})

let data = computed(() => {
  let arr:any = []
  if(!Object.keys(originData.value).length) return arr
  customData.value.ids.forEach((id: string) => {
    let obj: any = {}
    option.header.columns.forEach((col: any, i: number) => {
      if(col.key === 'col1') {
        obj[col.key] = originData.value[id]?.node_name
      }
      else {
        let o = originData.value[id] ? originData.value[id] : null
        if(o) {
          let points:any = []
          let keys = ['aic', 'aoc', 'dic', 'doc']
          keys.forEach(k => {
            Object.keys(o[k]).forEach(kk => {
              points.push({
                __node_code: kk,
                ...o[k][kk]
              })
            })
          })
          let t:any = points.find((_: any) => _.__node_code === customData.value[`${col.key}Code`]) || {}
          obj[col.key] = t.value
        }
        else obj[col.key] = undefined
      }
    })
    arr.push(obj)
  })
  // if(!originData.value.length) return arr
  // customData.value.ids.forEach((id, i) => {
  //   let target = originData.value[i]
  //   let obj: any = {}
  //   option.header.columns.forEach((col: any, ci:number) => {
  //     if(ci === 0) {
  //       obj[col.key] = target.node_name
  //     }
  //     else {
  //       const pattern = col.reg.slice(1, -1);  // 移除开始和结束的斜杠
  //       let t = {node_value: ''}
  //       if(pattern) {
  //         const regex = new RegExp(pattern);
  //         t = target.children.find((_: any) => regex.test(_.node_name)) || {}
  //       }
  //       obj[col.key] = t.node_value
  //     }
  //   })
  //   arr.push(obj)
  // })
  return arr
})

//查询字段
const inputData = ref('')
//前台过滤
const filterData = computed(() => {
  return data.value.filter((item: any) => {
    return Object.values(item).some((val: any) => {
      return String(val).toLowerCase().includes(inputData.value.toLowerCase())
    })
  })
})


const columns = computed(() => {
  let arr = option.header.columns.filter((_: any) => _.show).map((item: any, i: number) => {
    let obj = item
    if(item.key === 'col1') item.title = customData.value.col1Title
    else if(item.key === 'col2') item.title = customData.value.col2Title
    else if(item.key === 'col3') item.title = customData.value.col3Title
    obj.render = (row: any) => {
      if(row[item.key] !== null && row[item.key] !== undefined) return row[item.key] + (item.unit ? item.unit : '')
      else return '--'
    }
    return obj
  })
  return arr
})

const originStore = useOriginStore()
const systemConfig = originStore.getOriginStore.user.systemConfig

let levels: number[] = []
let confirm_statuses: string[] = []
if (systemConfig['active_alarm_level']) {
  for (let i = 0; i < Number(systemConfig['active_alarm_level']); i++) {
    levels.push(i + 1)
  }
}
if (systemConfig['active_alarm_confirm_status']) {
  confirm_statuses = [...JSON.parse(systemConfig['active_alarm_confirm_status'])]
}

const getData = () => {
  if(!customData.value.ids.filter((_: string) => _).length) {
    originData.value = {}
    return
  }
  let params = {
    confirm_statuses,
    levels,
    device: customData.value.ids.map((id: string) => {
      return {dataType: 'point-title', dems_device_uid: id, is_all_point: false, points: [customData.value.col2Code, customData.value.col3Code]}
    })
  }
  publicInterface('/dcim/dems/device_point', 'cinterface_realtime_data_get_by_uid_no_err_v2', params).then(res => {
    if (res && res.data) {
      originData.value = res.data
      // let arr = customData.value.ids.map((id: string) => {
      //   let obj = {
      //     node_name: res.data[id] ? res.data[id].node_name : '',
      //     uid: id
      //   }
      //   return obj
      // })
      // getDataChild(arr)
    }
  })
}

// const getDataChild = (parents: any) => {
//   let params = {
//     "condition": {
//       "dems_device_uid": '',
//       "node_name": "",
//       "signal_id": "",
//       "node_status": null,
//       "data_type": "",
//       "dems_device_template_id": null,
//       "is_major_paramenter": "",
//       "is_show": true,
//       "open_driver": true
//     },
//     "page": {
//       "page_size": 99999,
//       "page_number": 1
//     }
//   }
//   let arr = customData.value.ids.map(_ => {
//     let p = cloneDeep(params)
//     p.condition.dems_device_uid = _
//     return publicInterface('/dcim/dems/device_point', 'get_page', p)
//   })
//   Promise.all(arr).then(res => {
//     let data = res.map(item => {
//       if(item && item.errcode === '00000') return item.data.item || []
//       else return []
//     })
//     data.forEach((item, i) => {
//       parents[i].children = item
//     })
//     originData.value = parents
//   })
// }

watch(() => [customData.value.enable, customData.value.col2Code, customData.value.col3Code, customData.value.ids.join('&&')].toString(), () => {
  if(customData.value.enable) getData()
}, {
  immediate: true,
  deep: true
})

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

// useChartCommonData(props.chartConfig, useChartEditStore)
</script>

<style lang="scss" scoped>
:deep(tr) {
  height: var(--lineHeight);
}
@include go('tables-basic') {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-end;
}
</style>
