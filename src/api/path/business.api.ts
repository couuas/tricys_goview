// import Cookies from 'js-cookie';
import { http } from "@/api/http";
import { RequestHttpEnum } from "@/enums/httpEnum";
import { httpErrorHandle } from '@/utils'

export function getToken() {
    let queryStr = window.location.href
    queryStr = queryStr.split('?')[1]
    if(queryStr.indexOf('#') > -1) queryStr = queryStr.split('#')[0]
    let query:{[key:string]: string} = {}
    queryStr.split('&').forEach((item:string) => {
        query[item.split('=')[0]] = item.split('=')[1]
    })
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
