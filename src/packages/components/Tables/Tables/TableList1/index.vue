<template>
  <div class="box">
    <div ref="list" class="list" :style="{transform: `translateY(${translateY}px)`}">
      <template v-if="isTag">
        <div class="item" v-for="(item, i) in datasetSource" :key="i">
          <img class="img" :src="Snow">
          <div class="label">{{item.name}}</div>
          <n-tag
            class="tag"
            size="small"
            :color="{textColor: computeColor(item.status).remark, borderColor: computeColor(item.status).remark}"
          >
            {{computeColor(item.status).label}}
          </n-tag>
        </div>
      </template>
      <template v-else>
        <div class="item" v-for="(item, i) in datasetSource" :key="i">
          <img class="img" :src="Snow">
          <div class="label" v-for="(col, ci) in datasetDimensions" :key="ci">{{item[col]}}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Snow from '@/assets/images/icons/snow.png'
import { useOriginStore } from '@/store/modules/originStore/originStore'
import { PropType, toRefs, ref, onMounted, watch, onUnmounted, computed } from "vue"
import { CreateComponentType } from '@/packages/index.d'
import { debounce } from 'lodash'
import { useChartCommonData } from "@/hooks";
import { useChartEditStore } from "@/store/modules/chartEditStore/chartEditStore";
import { CurrentSourceEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const originStore = useOriginStore()
const node_status = originStore?.getOriginStore?.user?.systemConstant?.node_status

const { w, h } = toRefs(props.chartConfig.attr)

const list = ref()
let translateY = ref(0)
let timer: any = ref(null)
let timeout = computed(() => props.chartConfig.option.timeout)

watch(() => h.value, () => {
  roll()
})
const roll = debounce(() => {
  translateY.value = 0
  clearTimeout(timer.value)
  if(list.value) {
    // let listHeight = list.value.offsetHeight
    let itemHeight = 40
    if(h.value < list.value.offsetHeight) {
      let fun = () => {
        if(Math.abs(translateY.value) > (list.value.offsetHeight - h.value)) {
          translateY.value = 0
          timer.value = setTimeout(fun, timeout.value)
          return
        }
        translateY.value -= itemHeight
        timer.value = setTimeout(fun, timeout.value)
      }
      timer.value = setTimeout(fun, timeout.value)
    }
  }
}, 200)

const option = computed(() => props.chartConfig.option)
console.log(props.chartConfig,'props.chartConfig')
const commonData = computed(() => props.chartConfig.commonData)

// const isPointTable = computed(() => {
//   return commonData.value.currentSource === CurrentSourceEnum.POINTTABLE
// })

const isTag = computed(() => {
  return option.value.dataset.source.length && Object.prototype.hasOwnProperty.call(option.value.dataset.source[0], 'status')
})

const datasetDimensions = computed(() => {
  return option.value.dataset.dimensions
})
console.log(datasetDimensions,'datasetDimensions')
const datasetSource = computed(() => {
  return option.value.dataset.source
})

const computeColor = (status: number | undefined) => {
  type ItemType = {
    value: string,
    remark: string,
    label: string
  }
  if(node_status.length && typeof status === 'number') {
    return node_status.find((_: ItemType) => _.value == status.toString())
  }
  else {
    return {
      remark: '#aaaaaa',
      label: '无'
    }
  }
}

watch(() => h.value, () => {
  roll()
})

onMounted(() => {
  roll()
})
onUnmounted(() => {
  if(timer.value) clearTimeout(timer.value)
})

useChartCommonData(props.chartConfig, useChartEditStore, (resData: {}) => {
  props.chartConfig.option.dataset = resData
})
</script>

<style lang="scss" scoped>
.box{
  overflow-y: hidden;
  .list{
    color: #fff;
    transform: translateY(40px);
    transition: all 1s;
    .item{
      height: 35px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 5px;
      background: rgba(65, 150, 255, 0.08);
      border-radius: 4px;
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
      .img{
        flex: none;
        width: 16px;
        height: 16px;
      }
      .label{
        flex: 1;
        color: #4196ff;
        padding: 0 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .tag{
        flex: none;
      }
    }
  }
}
</style>