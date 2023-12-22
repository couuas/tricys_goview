// import Cookies from 'js-cookie';
import { http } from "@/api/http";
import { RequestHttpEnum } from "@/enums/httpEnum";
import { httpErrorHandle } from '@/utils'

const allCookies = document.cookie;
function getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
console.log(allCookies, getCookie('access_token'));

export function getToken() {
    const TokenKey = 'access_token'
    if (getCookie(TokenKey)) {
        return getCookie(TokenKey)
    } else {
        return sessionStorage.getItem(TokenKey)
    }
}

export const publicInterface = async (paramType:string, interfaceType:string, paramData:any) =>{
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
