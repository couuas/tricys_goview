<template>
  <div v-if="chartConfig.customData.mapId" :style="{width: w, height: h}">
<!--    :style="{transform: handleScale}"-->
    <iframe ref="iframe" :src="url" :width="w" :height="h" style="transform-origin: left top" frameborder="no" scrolling="no"></iframe>
  </div>
  <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;" v-else>
    <img src="@/assets/images/exception/nodata.svg" style="width: 100%;height: 30%" alt="">
    <div style="color: #fff;text-align: center;font-size: 40px;">请输入组态ID</div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, toRefs, onMounted, onUnmounted, ref, watch } from 'vue'
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
  const account = 'admin'
  const password = 'laimi@123'
  let origin = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://192.168.0.42:9528'
  let str = `${origin}/static/#/dynamicRing/schematicDiagram/${props.chartConfig.customData.mapId}?parentOrigin=${window.location.origin}&isIframe=true&account=${account}&password=${password}`
  return str
})

const iframe = ref()
const option = computed(() => {
  return props.chartConfig.option
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
    else if(obj.type === 'loaded') {
      sessionStorage.removeItem("pageLoadMethod")
      postMsgToChild({
        type: 'setTop&Left&Scale',
        top: option.value.top,
        left: option.value.left,
        scale: option.value.scale,
        isThereATitleComponet: option.value.isThereATitleComponet
      })
    }
    else if(obj.type === 'setWidthAndHeight') {
      // iframeWidth.value = obj.width
      // iframeHeight.value = obj.height
    }
    else if(obj.type === 'setIframe') {
      postMsgToChild({
        type: 'setTop&Left&Scale',
        top: option.value.top,
        left: option.value.left,
        scale: option.value.scale,
        isThereATitleComponet: option.value.isThereATitleComponet
      })
    }
  }
}

const setIframeStr = computed(() => {
  return [option.value.top, option.value.left, option.value.scale, option.value.isThereATitleComponet].join('&&')
})

watch(() => setIframeStr, () => {
  postMsgToChild({
    type: 'setTop&Left&Scale',
    top: option.value.top,
    left: option.value.left,
    scale: option.value.scale,
    isThereATitleComponet: option.value.isThereATitleComponet
  })
}, {
  deep: true
})

const postMsgToChild = (obj: Object) => {
  if(iframe.value) {
    let origin = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://192.168.0.42:9528'
    iframe.value.contentWindow.postMessage(obj, origin);
  }
}

const iframeWidth = ref(1920)
const iframeHeight = ref(1080)

const handleScale = computed(() => {
  let x = w.value / iframeWidth.value
  let y = h.value / iframeHeight.value
  // let str = `scale(${x}, ${y})`
  let str = `scale(${1}, ${1})`
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