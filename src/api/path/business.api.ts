// import Cookies from 'js-cookie';
import { http } from "@/api/http";
import { RequestHttpEnum } from "@/enums/httpEnum";
import { httpErrorHandle } from '@/utils'

export function getToken() {
    const storage_access_token = localStorage.getItem('access_token')
    if(storage_access_token) return storage_access_token
    let queryStr = window.location.href
    queryStr = queryStr.split('?')[1]
    if(queryStr && queryStr.indexOf('#') > -1) queryStr = queryStr.split('#')[0]
    let query:{[key:string]: string} = {}
    queryStr && queryStr.split('&').forEach((item:string) => {
        query[item.split('=')[0]] = item.split('=')[1]
    })
    if(query.access_token) localStorage.setItem('access_token', query.access_token)
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
