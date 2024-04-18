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
import {customData as cd} from './config'

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

let originData = ref({}) as {[k: string]: any}

const customData = computed(() => {
  return props.chartConfig.customData as typeof cd
})

let data = computed(() => {
  let arr:any = []
  if(!Object.keys(originData.value).length) return arr
  customData.value.ids.forEach((id: string) => {
    let obj: any = {}
    option.header.columns.forEach((col: any, i: number) => {
      if(i === 0) {
        obj[col.key] = originData.value[id]?.[col.key]
      }
      else {
        let o = originData.value[id] ? originData.value[id] : null
        if(o) {
          let arr = [
            ...Object.values(o.aic),
            ...Object.values(o.aoc),
            ...Object.values(o.dic),
            ...Object.values(o.doc),
          ]
          let t:any = arr.find((_: any) => _.node_name === col.key) || {}
          obj[col.key] = t.value
        }
        else obj[col.key] = undefined
      }
    })
    arr.push(obj)
  })
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
  let arr = option.header.columns.filter((_: any) => _.show).map((item: any) => {
    let obj = item
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
    return
  }
  let params = {
    confirm_statuses,
    levels,
    device: customData.value.ids.map((id: string) => {
      return {dataType: 'point-title', dems_device_uid: id, is_all_point: true, points: []}
    })
  }
  publicInterface('/dcim/dems/device_point', 'cinterface_realtime_data_get_by_uid_no_err_v2', params).then(res => {
    if (res && res.data) {
      originData.value = res.data
    }
  })
}
watch(() => customData.value.ids, () => {
  getData()
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
::v-deep tr{
  height: var(--lineHeight);
}
@include go('tables-basic') {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-end;
}
</style>
