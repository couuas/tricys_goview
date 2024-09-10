<template>
  <div>
    <div style="display: flex;align-items: center; margin-top: 2px;">
      <n-space :size="5">
        <n-text class="text" depth="2">动态JSON</n-text>
        <n-switch v-model:value="requestBodyJSONPre.enable" size="small" />
        <n-text class="text" depth="2">启用将覆盖原JSON</n-text>
      </n-space>
    </div>
    <n-space vertical>
      <n-tag type="info">
        <span class="func-keyword">function</span>&nbsp;&nbsp;preHandler(global)&nbsp;&nbsp;{
      </n-tag>
      <monaco-editor v-model:modelValue="requestBodyJSONPre.handler" width="600px" height="300px" language="javascript" />
      <n-tag type="info">}</n-tag>
    </n-space>
    <n-space vertical>
      <n-text class="text" depth="2">处理结果</n-text>
      <n-code style="height: 300px" :code="result || '暂无'" language="json" :word-wrap="true"></n-code>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, toRefs } from 'vue'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import moment from 'moment'
import { getToken } from '@/api/path/business.api'

const props = defineProps({
  targetDataRequest: Object as PropType<RequestConfigType>
})
const { requestBodyJSONPre } = props.targetDataRequest as RequestConfigType

const errorFlag = ref(false)
const result = computed(() => {
  try {
    let str = ''
    if(requestBodyJSONPre) str = requestBodyJSONPre.handler
    const fn = new Function('global', str)
    const global = {
      moment,
      getToken
    }
    const res = fn(global)
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    errorFlag.value = false
    // @ts-ignore
    console.log(toString(res))
    // @ts-ignore
    return JSON.stringify(res, null, 2)
  } catch (error) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    errorFlag.value = true
    return `处理函数错误，日志：${error}`
  }
})
</script>

<style lang="scss" scoped>
.text{
  text-align: left;
  font-size: 12px;
}
</style>
