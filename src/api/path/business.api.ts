// import Cookies from 'js-cookie';
import { http } from "@/api/http";
import { RequestHttpEnum } from "@/enums/httpEnum";
import { httpErrorHandle } from '@/utils'
import moment from 'moment'

export function getToken() {
    // 为了开发时只单独展示goview 需要localStorage
    const storage_access_token = localStorage.getItem('access_token_obj')
    if(storage_access_token) {
        const obj = JSON.parse(storage_access_token)
        const { access_token, expiration } = obj
        if(expiration >= Number(moment().format('x'))) return access_token
    }
    let queryStr = window.location.href
    queryStr = queryStr.split('?')[1]
    if(queryStr && queryStr.indexOf('#') > -1) queryStr = queryStr.split('#')[0]
    let query:{[key:string]: string} = {}
    queryStr && queryStr.split('&').forEach((item:string) => {
        query[item.split('=')[0]] = item.split('=')[1]
    })
    const obj = {
        access_token: query.access_token,
        expiration: 86400000 + Number(moment().format('x'))
    }
    if(query.access_token) localStorage.setItem('access_token_obj', JSON.stringify(obj))
    return query.access_token
}

export const publicInterface = async (paramType:string, interfaceType:string, paramData?:unknown) =>{
    try {
        const access_token = getToken()
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
