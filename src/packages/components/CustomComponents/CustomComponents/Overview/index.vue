<template>
  <BorderBox :title="chartConfig?.customData?.title" :style="getStyle(borderRadius)" style="overflow: visible">
    <div class="overview" v-for="item in type_count" :key="item">
      <div class="img">
        <img
          v-if="props.chartConfig?.customData?.currentSource === 'IT'"
          src="@/assets/images/chart/decorates/Base1.png"
          alt=""
        />
        <img v-else src="@/assets/images/chart/decorates/Base4.png" alt="" />
        <div class="value" :class="{ brand: item.label === '常用品牌' }">
          {{ item.value || '0' }}
        </div>
      </div>
      <div class="label">
        {{ item.label }}
      </div>
    </div>
  </BorderBox>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted, nextTick, ref } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { publicInterface } from '@/api/path/business.api'
import BorderBox from '../components/BorderBox.vue'
import VChart from 'vue-echarts'
import { isPreview } from '@/utils'
import { graphic } from 'echarts'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { selectTimeOptions } from '@/views/chart/ContentConfigurations/components/ChartData/index.d'
import { RequestHttpIntervalEnum } from '@/enums/httpEnum'
import { useGlobalQueryParamsStore } from '@/store/modules/globalQueryParamsStore/globalQueryParamsStore'
const globalQueryParamsStore = useGlobalQueryParamsStore()
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
let type_count: any = ref([])
const queryParams = {
  ...globalQueryParamsStore.getGlobalQueryParams
}
const getData = () => {
  if (props.chartConfig?.customData?.currentSource === 'IT') {
    publicInterface('/dcim/asset', 'get_asset_overview_page_info_new', {
      ...globalQueryParamsStore.getGlobalQueryParams
    }).then(res => {
      if (res && res.data) {
        console.log(res.data, 'data____')
        let commonBrands = res.data.brand_count?.reduce((prev: any, curr: any) => {
          if (!prev) return curr
          const prevValue: any = Object.values(prev)[0]
          const currValue: any = Object.values(curr)[0]
          return currValue > prevValue ? curr : prev
        }, undefined)
        let obj = [
          {
            label: '设备总数',
            value: res.data?.type_count?.reduce((pre: any, cur: any) => (pre += Object.values(cur)[0]), 0) || '0'
          },
          {
            label: '常用品牌',
            value: res.data.brand_count ? (commonBrands ? Object.keys(commonBrands)[0] : '未知品牌') : '无' //无数据处理
          }
        ]
        type_count.value = obj
        console.log(type_count, 'type_count_type_count')

        // for (const key in computeNodeData) {
        //   computeNodeData[key] = res.data[key]
        // }
      }
    })
  } else {
    publicInterface('/dcim/dems/device', 'get_dev_brand_count', {
      device_codes: props.chartConfig?.customData?.device_codes?.length
        ? props.chartConfig?.customData?.device_codes?.split(',')
        : [],
      ...globalQueryParamsStore.getGlobalQueryParams
    }).then(res => {
      if (res && res.data) {
        const commonBrands: any = res?.data?.reduce((prev: any, curr: any) => {
          // 如果 prev 不存在，则初始化为当前元素
          return prev ? (curr.count > prev.count ? curr : prev) : curr
        }, undefined)
        let obj = [
          {
            label: '设备总数',
            value: res.data.reduce((pre: any, cur: any) => (pre += cur.count), 0)
          },
          {
            label: '常用品牌',
            value: res?.data?.length ? commonBrands?.name || '未知品牌' : '无' // 无数据处理
          }
        ]
        type_count.value = obj

        // for (const key in computeNodeData) {
        //   computeNodeData[key] = res.data[key]
        // }
      }
    })
  }
}
let timer: unknown
watch(
  () => [props.chartConfig.request.requestInterval, props.chartConfig.request.requestIntervalUnit].join('&&'),
  v => {
    if (!isPreview()) return

    if (props.chartConfig.request.requestInterval) {
      startInterval()
    }
  },
  {
    deep: true
  }
)

watch(
  () => props.chartConfig?.customData?.currentSource,
  () => {
    getData()
    // 根据currentSource去获取对应 参数
  }
)
watch(
  () => props.chartConfig?.request?.immediate,
  v => {
    if (!v) return
    getData()
    startInterval()

    props.chartConfig.request.immediate = false
    // 根据currentSource去获取对应 参数
  }
)
const startInterval = () => {
  if (!isPreview()) return
  if (timer) clearInterval(timer as number)
  const obj = selectTimeOptions.find(_ => _.value === props.chartConfig.request.requestIntervalUnit) || { unit: 0 }
  const unit = obj.unit
  const number = unit * props.chartConfig.request.requestInterval!
  timer = setInterval(() => {
    console.log('class_setInterval')
    nextTick(() => {
      getData()
    })
  }, number)
}
onMounted(() => {
  getData()
  startInterval()
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
.overview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
  color: #fff;
  padding: 0 20px;
  .img {
    position: relative;
    width: 100px;
    height: 100px;
    .value {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      white-space: pre-wrap;
      text-align: center;
      font-size: 20px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
  .brand {
    font-size: 16px !important;
  }
}
</style>
