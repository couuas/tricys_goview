import moment from "moment";
import { httpErrorHandle } from "@/utils";
import { publicInterface } from '@/api/path/business.api'
import { EchartsDataType } from '@/packages/index.d'

import {
    RequestBodyEnum,
    RequestHttpEnum,
    RequestHttpIntervalEnum,
    RequestParams, RequestParamsObjType,
    RequestParamsTypeEnum
} from "@/enums/httpEnum";
import { getToken } from '@/api/path/business.api'

// export const getData = async () => {
//     try {
//         const methodArr = 'handle'.split('_')
//         const queryNodeFlowParam = {
//             types: ['rec'],
//             start_time: moment(new Date(new Date().getTime() - 10 * 60 * 1000)).format('YYYY-MM-DD HH:mm:ss'),
//             end_time: moment().format('YYYY-MM-DD HH:mm:ss'),
//             duration: 15,
//             query_type: ''
//         }
//         queryNodeFlowParam.types = [methodArr[0]]
//         queryNodeFlowParam.query_type = methodArr[1] || ''
//         const start_time = moment().subtract(10, 'm').format('YYYY-MM-DD HH:mm:ss')
//         const end_time = moment().format('YYYY-MM-DD HH:mm:ss')
//         queryNodeFlowParam.start_time = start_time
//         queryNodeFlowParam.end_time = end_time
//         const res = await publicInterface('/dcim/dems/statistic', 'get_point_realtime_data_echarts', queryNodeFlowParam)
//         const obj:EchartsDataType = {
//             dimensions: [],
//             source: []
//         }
//         if(res && res.errcode === '00000') {
//             interface SeriesItemType {
//                 data: Array<any>
//             }
//             const x = res.data.echarts.xAxis.data.slice(-10)
//             const v = res.data.echarts.series.map((_:SeriesItemType) => _.data.slice(-10))
//             let xAxisName = ''
//             if(queryNodeFlowParam.query_type === '') xAxisName = '速率(测点/s)'
//             else xAxisName = '测点总数'
//             obj.dimensions = ['product', ...Array(v.length).fill({}).map((_, i) => `${xAxisName}_${i + 1}`)]
//             obj.source = x.map((_:any) => ({product: _}))
//             obj.dimensions.slice(1).forEach((key, vi) => {
//                 obj.source.forEach((item, i) => {
//                     item[key] = v[vi][i]
//                 })
//             })
//         }
//         return obj
//     } catch {
//         httpErrorHandle()
//     }
// }

const methodArr = 'handle'.split('_')
const queryNodeFlowParam = {
    types: ['rec'],
    start_time: moment(new Date(new Date().getTime() - 10 * 60 * 1000)).format('YYYY-MM-DD HH:mm:ss'),
    end_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    duration: 15,
    query_type: ''
}
queryNodeFlowParam.types = [methodArr[0]]
queryNodeFlowParam.query_type = methodArr[1] || ''
const start_time = moment().subtract(10, 'm').format('YYYY-MM-DD HH:mm:ss')
const end_time = moment().format('YYYY-MM-DD HH:mm:ss')
queryNodeFlowParam.start_time = start_time
queryNodeFlowParam.end_time = end_time

function requestBodyJSONPreHandler(global:any) {
    const methodArr = 'handle'.split('_')
    const obj = {
        access_token: global.getToken(),
        type: 'get_point_realtime_data_echarts',
        data: {
            types: [methodArr[0]],
            start_time: global.moment().subtract(10, 'm').format('YYYY-MM-DD HH:mm:ss'),
            end_time: global.moment().format('YYYY-MM-DD HH:mm:ss'),
            duration: 15,
            query_type: methodArr[1] || ''
        }
    }
    return obj
}
const requestBodyJSONPreHandlerStr = requestBodyJSONPreHandler.toString().replace(/^function[\s\S]*?\{/m, '').replace(/\}$/, '')

export const requestConfig = {
    "requestDataType": 1,
    "requestHttpType": RequestHttpEnum.POST,
    "requestUrl": "/api/goview/dcim/dems/statistic",
    "requestInterval": 5,
    "requestIntervalUnit": RequestHttpIntervalEnum.SECOND,
    "requestContentType": 0,
    "requestParamsBodyType": RequestBodyEnum.JSON,
    "requestSQLContent": {
        "sql":"select * from where"
    },
    "requestParams": {
        [RequestParamsTypeEnum.BODY]: {
            [RequestBodyEnum.JSON]: JSON.stringify({
                access_token: getToken(),
                type: 'get_point_realtime_data_echarts',
                data: queryNodeFlowParam
            }, null, 2)
        }
    } as RequestParams,
    "requestBodyJSONPre": {
        enable: true,
        handler: requestBodyJSONPreHandlerStr
    }
}

// js代码配置filter 后面会转成string 忽略ts检查

// @ts-ignore
function filterFn(data) {
    const obj = {}
    const x = data.echarts.xAxis.data.slice(-10)
    // @ts-ignore
    const v = data.echarts.series.map((_) => _.data.slice(-10))
    // @ts-ignore
    obj.dimensions = ['product', ...Array(v.length).fill({}).map((_, i) => `测点总数_${i + 1}`)]
    // @ts-ignore
    obj.source = x.map((_) => ({product: _}))
    // @ts-ignore
    obj.dimensions.slice(1).forEach((key, vi) => {
        // @ts-ignore
        obj.source.forEach((item, i) => {
            item[key] = v[vi][i]
        })
    })
    return obj
}

export const filterConfig = filterFn.toString().replace(/^function[\s\S]*?\{/m, '').replace(/\}$/, '')

// export const requestConfig = {
//     "requestDataType": 1,
//     "requestHttpType": RequestHttpEnum.GET,
//     "requestUrl": "/api/leftBottom",
//     "requestInterval": 5,
//     "requestIntervalUnit": RequestHttpIntervalEnum.SECOND,
//     "requestContentType": 0,
//     "requestParamsBodyType": RequestBodyEnum.NONE,
//     "requestSQLContent": {
//         "sql":"select * from where"
//     },
//     "requestParams": {} as RequestParams
// }

