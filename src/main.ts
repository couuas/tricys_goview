import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import i18n from '@/i18n/index'
import { setupStore } from '@/store'
import { setupNaive, setupDirectives, setupCustomComponents, initFunction } from '@/plugins'
import { GoAppProvider } from '@/components/GoAppProvider/index'
import { setHtmlTheme, getLocalStorage, setLocalStorage } from '@/utils'
import { addCollection } from 'iconify-icon'
import uimIcons from '@iconify/json/json/uim.json'
import lineMdIcons from '@iconify/json/json/line-md.json'
import wiIcons from '@iconify/json/json/wi.json'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'

// 引入全局样式
import '@/styles/pages/index.scss'
// 引入动画
import 'animate.css/animate.min.css'
// 引入标尺
import 'vue3-sketch-ruler/lib/style.css'
// 注册图标
addCollection(uimIcons)
addCollection(lineMdIcons)
addCollection(wiIcons)

async function appInit() {
  const goAppProvider = createApp(GoAppProvider)

  const app = createApp(App)

  // 注册全局常用的 naive-ui 组件
  setupNaive(app)

  // 注册全局自定义指令
  setupDirectives(app)

  // 注册全局自定义组件
  setupCustomComponents(app)

  // 挂载状态管理
  setupStore(app)

  // Seed store from URL params (search or hash query) for iframe loads
  const resolveStartupParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash || '';
    const hashQuery = hash.includes('?') ? hash.split('?')[1] : '';
    const hashParams = new URLSearchParams(hashQuery);
    const getParam = (key: string) => searchParams.get(key) || hashParams.get(key);
    return {
      token: getParam('token'),
      apiBase: getParam('apiBase'),
      projectId: getParam('projectId')
    };
  };

  const { token, apiBase, projectId } = resolveStartupParams();

  if (token) {
    const systemStore = useSystemStore()
    systemStore.setItem(SystemStoreEnum.USER_INFO, {
      [SystemStoreUserInfoEnum.USER_TOKEN]: token,
      [SystemStoreUserInfoEnum.TOKEN_NAME]: 'token',
      [SystemStoreUserInfoEnum.USER_ID]: 'tricys_user',
      [SystemStoreUserInfoEnum.USER_NAME]: 'tricys_user',
      [SystemStoreUserInfoEnum.NICK_NAME]: 'Tricys User'
    })

    // Also set chart store config
    const chartEditStore = useChartEditStore()
    const headers = chartEditStore.requestGlobalConfig.requestParams.Header || {}
    headers.Authorization = `Bearer ${token}`
    chartEditStore.requestGlobalConfig.requestParams.Header = headers
  }

  if (apiBase) {
    const chartEditStore = useChartEditStore()
    chartEditStore.requestGlobalConfig.requestOriginUrl = apiBase
    // save context
    const ctxKey = 'TRICYS_CTX'
    const stored = getLocalStorage(ctxKey) || {}
    setLocalStorage(ctxKey, { ...stored, apiBase })
  }

  // Host bridge: accept iframe context and update request globals
  const setupTricysBridge = () => {
    const chartEditStore = useChartEditStore()
    const ctxKey = 'TRICYS_CTX'

    const applyContext = (payload?: any) => {
      if (!payload || typeof payload !== 'object') return
      if (payload.apiBase) {
        chartEditStore.requestGlobalConfig.requestOriginUrl = payload.apiBase
      }
      if (payload.token) {
        const headers = chartEditStore.requestGlobalConfig.requestParams.Header || {}
        headers.Authorization = `Bearer ${payload.token}`
        chartEditStore.requestGlobalConfig.requestParams.Header = headers

        // Sync to SystemStore for axios
        const systemStore = useSystemStore()
        systemStore.setItem(SystemStoreEnum.USER_INFO, {
          [SystemStoreUserInfoEnum.USER_TOKEN]: payload.token,
          [SystemStoreUserInfoEnum.TOKEN_NAME]: 'token',
          [SystemStoreUserInfoEnum.USER_ID]: payload.userId || 'tricys_user',
          [SystemStoreUserInfoEnum.USER_NAME]: 'tricys_user',
          [SystemStoreUserInfoEnum.NICK_NAME]: 'Tricys User'
        })
      }
      if (payload.projectId) {
        setLocalStorage(ctxKey, { ...payload })
      }
    }

    window.addEventListener('message', (event) => {
      const data = event.data
      if (!data || typeof data !== 'object') return

      if (data.type === 'TRICYS_CTX') {
        applyContext(data.payload)
      }

      if (data.type === 'TRICYS_PROJECT_SWITCH') {
        const stored = getLocalStorage(ctxKey) || {}
        applyContext({ ...stored, projectId: data.payload?.projectId })
      }

      if (data.type === 'TRICYS_REFRESH') {
        window.location.reload()
      }
    })

    if (window.parent && window.parent !== window) {
      const targetOrigin = document.referrer ? new URL(document.referrer).origin : '*'
      window.parent.postMessage({ type: 'GOVIEW_READY', payload: { version: 'local' } }, targetOrigin)
    }
  }

  // 解决路由守卫，Axios中可使用，Dialog，Message 等全局组件
  goAppProvider.mount('#appProvider', true)

  // 挂载路由
  setupRouter(app)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  // Store 准备就绪后处理主题色
  setHtmlTheme()

  // 语言注册
  app.use(i18n)

  // 挂载到页面
  app.mount('#app', true)

  // 挂载到 window
  window['$vue'] = app

  setupTricysBridge()
}

appInit().then(() => {
  initFunction()
})

