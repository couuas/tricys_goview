<template>
  <!-- 事件配置 -->
  <n-collapse class="go-mt-3" arrow-placement="right" :default-expanded-names="['1', '2']">
    <n-text depth="3">
      组件 id：
      <n-text>{{ targetData.id }}</n-text>
    </n-text>
<!--    <chart-event-interaction></chart-event-interaction>-->
<!--    <chart-event-base-handle></chart-event-base-handle>-->
<!--    <chart-event-advanced-handle></chart-event-advanced-handle>-->
    <div style="display: flex;align-items:center;margin-top: 10px">
      <div style="margin-right: 10px;width: 60px;">链接</div>
      <n-input-group style="width: calc(100% - 70px)">
        <n-select
          v-model:value="targetData.customEvent.click.linkHead"
          size="small"
          :style="{ width: '80%' }"
          :options="linkHeadOptions"
        />
        <n-input v-model:value="targetData.customEvent.click.link" size="small"></n-input>
        <n-button :disabled="!targetData.customEvent.click.link" secondary size="small" @click="handleClick">跳转</n-button>
      </n-input-group>
    </div>
    <div style="display: flex;align-items:center;margin-top: 10px">
      <div style="margin-right: 10px;width: 60px;">新开页面</div>
      <n-switch size="small" v-model:value="targetData.customEvent.click.isBlank"/>
    </div>
  </n-collapse>
</template>

<script setup lang="ts">
import {ref, reactive, computed, watch, watchEffect, Ref} from 'vue'
import { ChartEventInteraction } from './components/ChartEventInteraction'
import { ChartEventAdvancedHandle } from './components/ChartEventAdvancedHandle'
import { ChartEventBaseHandle } from './components/ChartEventBaseHandle'
import { useTargetData } from '../hooks/useTargetData.hook'
import { postMessageToParent } from "@/utils";

const { targetData, chartEditStore } = useTargetData()
const showModal = ref(false)

// const { chartEditStore } = useTargetData()
// const targetIndex = computed(() => chartEditStore.fetchTargetIndex())
// const list = computed(() => chartEditStore.getComponentList)
// let targetData:any = ref(list.value[targetIndex.value])
// const isReady = ref(false)

// const init = () => {
//   if(!targetData.value.customEvent) {
//     targetData.value.customEvent = {
//       click: {
//         linkHead: 'http://',
//         link: '',
//       }
//     }
//   }
// }
// init()
// watch(() => targetIndex.value, newIndex => {
//   // isReady.value = false
//   targetData.value = list.value[newIndex]
//   init()
//   setTimeout(() => {
//     // isReady.value = true
//   })
// })
// watch(() => list.value.length, () => {
//   targetData.value = list.value[targetIndex.value]
//   init()
// })

const linkHeadOptions = ['http://', 'https://', '/'].map(_ => ({label: _, value: _}))

const finallyLink = computed(() => {
  return targetData.value.customEvent.click.linkHead + (targetData.value as any).customEvent.click.link
})
const handleClick = () => {
  if(!finallyLink.value) return
  let isRelativePath = targetData.value.customEvent.click.linkHead === '/'
  if(targetData.value.customEvent.click.isBlank) postMessageToParent({
    type: 'windowOpen',
    url: finallyLink.value,
    openNew: true,
    isRelativePath
  })
  else postMessageToParent({
    type: 'windowOpen',
    url: finallyLink.value,
    isRelativePath
  })
}
</script>
