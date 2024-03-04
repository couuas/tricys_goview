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
import { useRouterStore } from '@/store/modules/routerStore/routerStore'
import { useOriginStore } from '@/store/modules/originStore/originStore'
import { useGetMessageByParent } from '@/utils/utils'
import router from '@/router'

const {getMessageByParent} = useGetMessageByParent()

// console.log(window.location.origin)
const routerStore = useRouterStore()
getMessageByParent('setCallByParent', (e) => {
  if(e.data.type === 'setCallByParent' && e.data.page === 'customLargeScreen') {
    const {data}:{data:any} = e
    if(data.page === 'customLargeScreen' && data.type === 'setCallByParent') {
      routerStore.setCallByParent(data.callByParent)
    }
  }
})

const originStore = useOriginStore()
getMessageByParent('getStore', (e) => {
  if(e.data.type === 'getStore' && e.data.page === 'customLargeScreen') {
    originStore.setOriginStore(e.data.data, false)
  }
})

getMessageByParent('loaded', (e) => {
  if(e.data.type === 'changeRoute' && e.data.page === 'customLargeScreen') {
    routerStore.setToken(e.data.token)
    router.replace(e.data.path ? e.data.path : '/chart/preview/null')
  }
})
// getToken()

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
