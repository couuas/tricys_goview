<template>
  <div v-if="chartConfig.customData.mapId" :style="{width: w, height: h}">
    <iframe :src="url" width="1920" height="1080" style="transform-origin: left top" :style="{transform: handleScale}" frameborder="no" scrolling="no"></iframe>
  </div>
  <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;" v-else>
    <img src="@/assets/images/exception/nodata.svg" style="width: 100%;height: 30%" alt="">
    <div style="color: #fff;text-align: center;font-size: 40px;">请输入组态ID</div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, toRefs, onMounted, onUnmounted } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useOriginStore } from '@/store/modules/originStore/originStore'
import { postMessageToParent } from '@/utils'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & { customData: { mapId: any } }>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)

const originStore = useOriginStore()

let url = computed(() => {
  // const account = originStore?.getOriginStore?.user?.user?.account
  console.log(originStore.getOriginStore)
  const account = 'admin'
  const password = 'laimi@123'
  let origin = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://192.168.0.42:9528'
  let str = `${origin}/static/#/dynamicRing/schematicDiagram/${props.chartConfig.customData.mapId}?parentOrigin=${window.location.origin}&isIframe=true&account=${account}&password=${password}`
  return str
})

const handleMsg = (event: any) => {
  let origin = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://192.168.0.42:9528'
  if (event.origin === origin) {
    // 处理来自子级页面的消息
    let obj = event.data
    if(obj.type === 'changeRoute') {
      postMessageToParent({
        type: 'changeRouterV1',
        url: obj.path
      })
    }
  }
}

const handleScale = computed(() => {
  let x = w.value / 1920
  let y = h.value / 1080
  let str = `scale(${x}, ${y})`
  return str
})

onMounted(() => {
  window.addEventListener('message', handleMsg);
})
onUnmounted(() => {
  window.removeEventListener('message', handleMsg)
})

</script>

<style lang="scss" scoped>

</style>