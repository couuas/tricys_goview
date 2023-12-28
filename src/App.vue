<template>
  <n-config-provider
    :theme="darkTheme"
    :hljs="hljsTheme"
    :locale="locale"
    :date-locale="dateLocale"
    :theme-overrides="overridesTheme"
  >
    <go-app-provider>
      <I18n></I18n>
      <router-view></router-view>
    </go-app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { GoAppProvider } from '@/components/GoAppProvider'
import { I18n } from '@/components/I18n'
import { useSystemInit, useDarkThemeHook, useThemeOverridesHook, useCode, useLang } from '@/hooks'
import { getToken } from '@/api/path'
import { onMounted, onUnmounted } from 'vue'
import { useRouterStore } from '@/store/modules/routerStore/routerStore'

const routerStore = useRouterStore()
let handleMessage = function(event:{data:string}) {
  const {data}:{data:any} = event
  if(data.page === 'customLargeScreen' && data.type === 'setCallByParent') {
    routerStore.setCallByParent(data.callByParent)
  }
}
onMounted(() => {
  window.addEventListener('message', handleMessage);
  let obj = {
    page: 'customLargeScreen',
    type: 'bindPostMessageEvent'
  }
  window.parent.postMessage(JSON.stringify(obj), '*');
})
onUnmounted(() => {
  window.removeEventListener('message', handleMessage);
})

getToken()

// 暗黑主题
const darkTheme = useDarkThemeHook()

// 主题配置
const overridesTheme = useThemeOverridesHook()

// 代码主题
const hljsTheme = useCode()

// 系统全局数据初始化
useSystemInit()

// 全局语言
const { locale, dateLocale } = useLang()
//测试提交
</script>
