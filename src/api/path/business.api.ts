// import Cookies from 'js-cookie';
import { http } from "@/api/http";
import { RequestHttpEnum } from "@/enums/httpEnum";
import { httpErrorHandle } from '@/utils'
import moment from 'moment'

/*
export function getToken() {
    // 为了开发时只单独展示goview 需要localStorage
    // const storage_access_token = localStorage.getItem('access_token_obj')
    // if(storage_access_token) {
    //     const obj = JSON.parse(storage_access_token)
    //     const { access_token, expiration } = obj
    //     if(expiration >= Number(moment().format('x'))) return access_token
    // }
    let queryStr = window.location.href
    queryStr = queryStr.split('?')[1]
    if(queryStr && queryStr.indexOf('#') > -1) queryStr = queryStr.split('#')[0]
    let query:{[key:string]: string} = {}
    queryStr && queryStr.split('&').forEach((item:string) => {
        query[item.split('=')[0]] = item.split('=')[1]
    })
    // const obj = {
    //     access_token: query.access_token,
    //     expiration: 86400000 + Number(moment().format('x'))
    // }
    // if(query.access_token) localStorage.setItem('access_token_obj', JSON.stringify(obj))
    return query.access_token
}
 */

// 初次等待久一点 因为dom加载后才能获取父页面传来的token 才能存入store
export async function getToken() {
    return new Promise(resolve => {
        let timer = setInterval(() => {
            import('@/store/modules/routerStore/routerStore').then(res => {
                let routerStore = res.useRouterStore()
                if(routerStore.token) {
                    clearInterval(timer)
                    resolve(routerStore.token)
                }
            })
        }, 100)
    })
}

export const publicInterface = async (paramType:string, interfaceType:string, paramData?:unknown) =>{
    try {
        let access_token = ''
        if(import.meta.env.MODE === 'production') {
            access_token = await getToken() as string
        }
        else {
            access_token = import.meta.env.VITE_DEV_TOKEN
        }
        const res = await http(RequestHttpEnum.POST)<any>(paramType, {
            access_token,
            type: interfaceType,
            data: paramData
        })
        return res
    } catch {
        httpErrorHandle()
    }
}
