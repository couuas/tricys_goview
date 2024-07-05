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
import {useDesignStore} from "@/store/modules/designStore/designStore";
import { AppThemeColorType } from '@/store/modules/designStore/designStore.d'

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
    let map: { [k: string]: AppThemeColorType } = {
      blueTheme: {
        "CMYK": [75, 41, 0, 0],
        "RGB": [65,150,255],
        "hex": "#4196ff",
        "name": "天蓝",
        "pinyin": "tianlan"
      },
      greenTheme: {
        "CMYK": [100, 0, 3, 17],
        "RGB": [0,212,206],
        "hex": "#00d4ce",
        "name": "墨绿",
        "pinyin": "molv"
      },
      simpleTheme: {
        "CMYK": [0, 82, 70, 35],
        "RGB": [167,30,50],
        "hex": "#a71e32",
        "name": "简约",
        "pinyin": "jianyue"
      },
      whiteOrangeTheme: {
        "CMYK": [0, 50, 100, 7],
        "RGB": [238,119,0],
        "hex": "#EE7700",
        "name": "白橙",
        "pinyin": "baicheng"
      },
      lightSkyBlueTheme: {
        "CMYK": [99, 11, 0, 5],
        "RGB": [3,216,243],
        "hex": "#03D8F3",
        "name": "亮天蓝色",
        "pinyin": "liangtianlanse"
      },
    }
    let theme = e.data.data.app.theme as string
    const designStore = useDesignStore()
    designStore.setAppColor(map[theme])
  }
})

getMessageByParent('loaded', (e) => {
  if(e.data.type === 'changeRoute' && e.data.page === 'customLargeScreen') {
    if(import.meta.env.MODE === 'production') {
      routerStore.setToken(e.data.token)
    }
    else {
      routerStore.setToken(import.meta.env.VITE_DEV_TOKEN)
    }
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
