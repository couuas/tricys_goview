<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <collapse-item name="视频" expanded>
    <setting-item-box name="源" alone>
      <setting-item name="">
        <n-select v-model:value="optionData.dataset" :options="datasetList" :render-option="renderOption" size="small"></n-select>
      </setting-item>
<!--      <setting-item name="自定义源">-->
<!--        <n-input v-model:value="optionData.dataset" size="small"></n-input>-->
<!--      </setting-item>-->
    </setting-item-box>
    <setting-item-box name="混合模式" alone>
      <setting-item name="使用滤色选项可以去除黑色背景">
        <n-select v-model:value="chartStyles.blendMode" :options="BlendModeEnumList" size="small"></n-select>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="控制">
      <setting-item>
        <n-checkbox v-model:checked="optionData.loop" size="small">循环播放</n-checkbox>
      </setting-item>
      <setting-item>
        <n-checkbox v-model:checked="optionData.muted" size="small">静音</n-checkbox>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="样式">
      <setting-item name="类型">
        <n-select v-model:value="optionData.fit" size="small" :options="fitList"></n-select>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, ref, h, VNodeChild } from 'vue'
import { SelectOption, SelectGroupOption } from 'naive-ui'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import SelectItem from './SelectItem.vue'
import { PickCreateComponentType, BlendModeEnumList } from '@/packages/index.d'


// 适应类型
const fitList = [
  {
    value: 'fill',
    label: 'fill'
  },
  {
    value: 'contain',
    label: 'contain'
  },
  {
    value: 'cover',
    label: 'cover'
  },
  {
    value: 'scale-down',
    label: 'scale-down'
  },
  {
    value: 'none',
    label: 'none'
  }
]

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  },
  chartStyles: {
    type: Object as PropType<Omit<PickCreateComponentType<'styles'>, 'animations'>>,
    required: true
  }
})

const datasetList = ref([
  'https://goviewpro.tos-cn-beijing.volces.com/charts-img-db/charts-img-db_id_17bwi76fzta800.mp4',
  'https://goviewpro.tos-cn-beijing.volces.com/charts-img-db/charts-img-db_id_cqlw0qmjt4o00.mp4',
  'https://easyv.assets.dtstack.com/data/video/105262/1634995/hieui98oid_1675409080094_4wtvy7l8fn.mp4'
].map(_ => ({ label: _, value: _ })))

const renderOption = (info: {option: SelectOption}): VNodeChild => {
  return [
    h(
      SelectItem,
      {
        imageUrl: info.option.value,
        onClick: () => handleClick(info.option.value as string),
        class: {
          active: info.option.value === props.optionData.dataset,
        },
        style: {
          width: 'calc(50% - 10px)'
        }
      }
    )
  ]
}

const handleClick = (v: string) => {
  props.optionData.dataset = v
}
</script>
