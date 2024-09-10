import axios, { AxiosResponse, AxiosRequestConfig, Axios, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { RequestHttpHeaderEnum, ResultEnum, ResultErrcode } from '@/enums/httpEnum'
import { PageEnum, ErrorPageNameMap } from '@/enums/pageEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { axiosPre } from '@/settings/httpSetting'
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { redirectErrorPage, getLocalStorage, routerTurnByName, isPreview } from '@/utils'
import { fetchAllowList } from './axios.config'
import includes from 'lodash/includes'
import { postMessageToParent } from "@/utils";

export interface MyResponseType<T> {
  code: ResultEnum
  data: T
  message: string
  //  兼顾主系统
  errcode: string
  errmsg: string
}

export interface MyRequestInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>>
}

const axiosInstance = axios.create({
  // baseURL: `${import.meta.env.PROD ? import.meta.env.VITE_PRO_PATH : ''}${axiosPre}`,
  baseURL: `${import.meta.env.PROD ? window.location.origin : ''}${axiosPre}`,
  timeout: ResultEnum.TIMEOUT
}) as unknown as MyRequestInstance

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // // 白名单校验
    // if (includes(fetchAllowList, config.url)) return config
    // // 获取 token
    // const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
    // // 重新登录
    // if (!info) {
    //   routerTurnByName(PageEnum.BASE_LOGIN_NAME)
    //   return config
    // }
    // const userInfo = info[SystemStoreEnum.USER_INFO]
    // config.headers[userInfo[SystemStoreUserInfoEnum.TOKEN_NAME] || 'token'] =  userInfo[SystemStoreUserInfoEnum.USER_TOKEN] || ''
    return config
  },
  (err: AxiosError) => {
    Promise.reject(err)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const { code, errcode, errmsg } = res.data as { code: number, errcode: string, errmsg: string }

    const logOutCodeList = ['00004', '000012', '000013']
    if(logOutCodeList.some(_ => _ === errcode)) {
      // window['$message'].error(errmsg)
      // setTimeout(() => {
      //   postMessageToParent({
      //     type: 'logOut'
      //   })
      // })

      // axios加载时 pinia还没加载好 要异步加载拿到pinia
      import('@/store/modules/modalStore/modalStore').then(res => {
        const modalStore = res.useModalStore()
        modalStore.setModalStore({
          showModal: true,
          title: '提示',
          content: errmsg,
          positiveText: '重新登录',
          positiveClick: () => {
            modalStore.clear()
            setTimeout(() => {
              postMessageToParent({
                type: 'logOut'
              })
            }, 500)
          },
        })
      })
      return Promise.resolve(res.data)
    }
    // 预览页面错误不进行处理
    if (isPreview()) {
      return Promise.resolve(res.data)
    }

    // if (code === undefined || code === null) return Promise.resolve(res.data)

    // 成功
    if (errcode === ResultErrcode.SUCCESS) {
      return Promise.resolve(res.data)
    }

    // // 登录过期
    // if (code === ResultEnum.TOKEN_OVERDUE) {
    //   window['$message'].error(window['$t']('http.token_overdue_message'))
    //   routerTurnByName(PageEnum.BASE_LOGIN_NAME)
    //   return Promise.resolve(res.data)
    // }

    // 固定错误码重定向
    // if (ErrorPageNameMap.get(code)) {
    //   redirectErrorPage(code)
    //   return Promise.resolve(res.data)
    // }

    // 统一提示错误
    window['$message'].error(errmsg)
    return Promise.resolve(res.data)
  },
  (err: AxiosError) => {
    Promise.reject(err)
    // const status = err.response?.status
    // switch (status) {
    //   case 401:
    //     routerTurnByName(PageEnum.BASE_LOGIN_NAME)
    //     Promise.reject(err)
    //     break
    //
    //   default:
    //     Promise.reject(err)
    //     break
    // }
  }
)

export default axiosInstance
