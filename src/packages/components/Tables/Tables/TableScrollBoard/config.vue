<template>
  <CollapseItem name="列表" :expanded="true">
    <SettingItemBox name="基础">
      <SettingItem name="表行数">
        <n-input-number
          v-model:value="optionData.rowNum"
          :min="1"
          size="small"
          placeholder="请输入自动计算"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="轮播时间(s)">
        <n-input-number
          v-model:value="optionData.waitTime"
          :min="1"
          size="small"
          placeholder="请输入轮播时间"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="表头高度">
        <n-input-number
          v-model:value="optionData.headerHeight"
          :min="1"
          size="small"
          placeholder="请输入表头高度"
        ></n-input-number>
      </SettingItem>
<!--      <SettingItem name="显示行号">-->
<!--        <n-switch size="small" v-model:value="optionData.index" />-->
<!--      </SettingItem>-->
    </SettingItemBox>
    <SettingItemBox name="配置" :alone="true">
<!--      <SettingItem name="表头数据">-->
<!--        <n-input v-model:value="header" :min="1" size="small" placeholder="表头数据(英文','分割)"></n-input>-->
<!--      </SettingItem>-->
<!--      <SettingItem name="列对齐方式">-->
<!--        <n-input v-model:value="align" :min="1" size="small" placeholder="对齐方式(英文','分割)"></n-input>-->
<!--      </SettingItem>-->
<!--      <SettingItem name="列宽度">-->
<!--        <n-input v-model:value="columnWidth" :min="1" size="small" placeholder="列宽度(英文','分割)"></n-input>-->
<!--      </SettingItem>-->
      <SettingItem name="轮播方式">
        <n-select
          v-model:value="optionData.carousel"
          :options="[
            { label: '单条轮播', value: 'single' },
            { label: '整页轮播', value: 'page' },
          ]"
        />
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="样式">
      <SettingItem name="表头背景色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.headerBGC"></n-color-picker>
      </SettingItem>
      <SettingItem name="奇数行背景色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.oddRowBGC"></n-color-picker>
      </SettingItem>
      <SettingItem name="偶数行背景色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.evenRowBGC"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="`列${i + 1}`" v-for="(item, i) in headerConfig" :key="i">
      <SettingItem name="展示" style="grid-column: 1 / 3">
        <n-space>
          <n-switch v-model:value="item.show" size="small"/>
        </n-space>
      </SettingItem>
      <SettingItem name="字段">
        <n-text style="height: 28px;line-height: 28px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden" :title="item.key ? item.key : '--'">{{item.key ? item.key : '--'}}</n-text>
      </SettingItem>
      <SettingItem name="标题">
        <n-input v-model:value="item.header" size="small" clearable/>
      </SettingItem>
      <SettingItem name="列对齐方式">
        <n-select v-model:value="item.align" :options="alignOption" size="small"/>
      </SettingItem>
      <SettingItem name="列宽度">
        <n-input-number v-model:value="item.columnWidth" :min="0" size="small"/>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, ref, watch, computed, toRefs } from 'vue'
import type { Ref, ToRefs } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option, AlignEnum, MapType } from './config'
import { PickCreateComponentType } from '@/packages/index.d'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})


// const header = ref()
// const align = ref()
// const columnWidth = ref()
//
// watch(
//   () => props.optionData,
//   newData => {
//     header.value = props.optionData.header.toString()
//     align.value = props.optionData.align.toString()
//     columnWidth.value = props.optionData.columnWidth.toString()
//   },
//   {
//     deep: false,
//     immediate: true
//   }
// )
//
// watch([header, align, columnWidth], ([headerNew, alignNew, columnWidthNew], [headerOld, alignOld, columnWidthOld]) => {
//   if (headerNew !== headerOld) {
//     props.optionData.header = headerNew.split(',')
//   }
//   if (alignNew !== alignOld) {
//     props.optionData.align = alignNew.split(',')
//   }
//   if (columnWidthNew !== columnWidthOld) {
//     // @ts-ignore
//     props.optionData.columnWidth = columnWidthNew.split(',')
//   }
// })

// const headerConfigMap: Ref<{ [k: string]: any }> = computed(() => {
//   return props.optionData.headerConfigMap
// })
// const headerConfig: Ref<any[]> = computed(() => {
//   return props.optionData.headerConfig
// })

const alignOption = [
  { label: '左', value: AlignEnum.LEFT },
  { label: '中', value: AlignEnum.CENTER },
  { label: '右', value: AlignEnum.RIGHT },
]
// const headerConfigMap: Ref<{ [k: string]: any }> = ref(props.optionData.headerConfigMap)
// const headerConfig: Ref<any[]> = ref(props.optionData.headerConfig)

const headerConfigMap = computed(() => props.optionData.headerConfigMap)
const headerConfig = computed(() => props.optionData.headerConfig)

// const { headerConfigMap, headerConfig } = toRefs(props.optionData) as ToRefs<{ headerConfigMap: { [k: string] : MapType }, headerConfig: MapType[] }>
//
// watch(() => props.optionData.dataset, (v) => {
//   v.dimensions.forEach((k: string) => {
//     // 初始化
//     if(!Object.prototype.hasOwnProperty.call(headerConfigMap.value, k)) {
//       headerConfigMap.value[k] = {
//         show: true,
//         key: k,
//         header: k,
//         align: AlignEnum.LEFT,
//         columnWidth: 100
//       }
//     }
//     headerConfig.value = v.dimensions.map((k: string) => {
//       return headerConfigMap.value[k]
//     })
//     headerConfig.value.unshift(headerConfigMap.value['index'])
//   })
// }, {
//   immediate: true,
//   deep: true
// })

</script>
