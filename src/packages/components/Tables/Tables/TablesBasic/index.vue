<template>
  <div class="go-tables-basic">
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
      :pagination="pagination"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, toRefs, watch, reactive, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { icon } from '@/plugins'
import {useChartCommonData} from "@/hooks";
import {useChartEditStore} from "@/store/modules/chartEditStore/chartEditStore";
import { isPreview } from '@/utils'
import { cloneDeep } from 'lodash'
import {useOriginStore} from "@/store/modules/originStore/originStore";
import { h as vueH, defineComponent } from 'vue'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { SearchIcon } = icon.ionicons5

//查询字段
const inputData = ref('')
//前台过滤
const filterData = computed(() => {
  return option?.dataset?.source?.filter((item: any) => {
    return Object.values(item).some(val => {
      return String(val).toLowerCase().includes(inputData.value.toLowerCase())
    })
  })
})

const { align, pagination, inputShow } = toRefs(props.chartConfig.option)

pagination.value.onChange = (page: number) => {
  pagination.value.page = page
}

const { w, h } = toRefs(props.chartConfig.attr)

const option = reactive({
  dataset: props.chartConfig.option.dataset,
  style: props.chartConfig.option.style,
  header: props.chartConfig.option.header
})

watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
    if(!isPreview()) option.header.value = newData.dimensions
    option.header.options = newData.dimensions
    newData.dimensions.forEach((key: string) => {
      if(!Object.prototype.hasOwnProperty.call(option.header.map, key)) option.header.map[key] = key
    })
    // if(newData.dimensions.toString() === option.header.options.map((_: {value: string}) => _.value).toString()) return
    // option.header.options = newData.dimensions.map((_: string) => ({label: _, value: _}))
    // option?.dataset?.dimensions?.forEach((header: any) => {
    //   header.align = align.value
    // })
  },
  {
    immediate: true,
    deep: true
  }
)

watch(() => props.chartConfig.option.header, v => {
  option.header = v
}, {
  immediate: true,
  deep: true
})

const colorToRgba = (sHex: any, alpha = 0.1) => {
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  /* 16进制颜色转为RGB格式 */
  let sColor = sHex.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //  处理六位的颜色值
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
  } else {
    return sColor
  }
}
const originStore = useOriginStore()

const columns = computed(() => {
  let dimensions = option.header.options.filter((_: string) => option.header.value.includes(_))
  dimensions = dimensions.map((_: string) => {
    return {
      title: option.header.map[_],
      key: _,
      align: align.value
    }
  })
  if(props.chartConfig.commonData.currentSource === 'pointTable') {
    let statusOption = originStore.getOriginStore.user.systemConstant.node_status || []
    let statusIndex = dimensions.map((_: any) => _.key).findIndex((_: string) => _ === 'status')
    if(statusIndex > -1) {
      let k = dimensions[statusIndex].key
      dimensions[statusIndex].render = (row: any) =>{
        let obj = statusOption.find((_: any) => _.value === row[k].toString()) || {label: ''}
        return vueH(
          'Span',
          {
            style: `background: ${colorToRgba(obj.remark)};color: ${obj.remark};border: 1px solid ${obj.remark};border-radius: 4px;padding: 2px 8px;font-size: 12px;`
          },
          {
            default: () => obj.label
          }
        )
      }
    }
  }
  return dimensions
})

useChartCommonData(props.chartConfig, useChartEditStore)
</script>

<style lang="scss" scoped>
@include go('tables-basic') {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-end;
}
</style>
