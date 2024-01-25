import type VChart from 'vue-echarts'
import { setOption } from "@/packages/public";
import { ref, toRefs, watch } from "vue";
import { CreateComponentType, ChartFrameEnum } from '@/packages/index.d'
import { useChartEditStore } from "@/store/modules/chartEditStore/chartEditStore";
import { CurrentSourceEnum, resultType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { intervalUnitHandle, newFunctionHandle, isPreview } from "@/utils";
import { cloneDeep } from 'lodash'
import { handlePointHistory } from './commonDataComponents/usePointHistoryRes'
import { handleEnergyUseHistory } from './commonDataComponents/useEnergyUseHistoryRes';
import { handleRecordValueHistory } from './commonDataComponents/useRecordValueHistoryRes'
import { handlePointRealTime } from './commonDataComponents/usePointRealTimeRes'
import { handleSinglePoint } from './commonDataComponents/useSinglePointRes'
import { ResultErrcode } from '@/enums/httpEnum'

// 获取类型
type ChartEditStoreType = typeof useChartEditStore

/**
 * setdata 数据监听与更改
 * @param targetComponent
 * @param useChartEditStore 若直接引会报错，只能动态传递
 * @param updateCallback 自定义更新函数
 */
export const useChartCommonData = (
    targetComponent: CreateComponentType,
    useChartEditStore: ChartEditStoreType,
) => {
    const vChartRef = ref<typeof VChart | null>(null)
    let fetchInterval: any = 0

    // 组件类型
    const { chartFrame } = targetComponent.chartConfig

    // eCharts 组件配合 vChart 库更新方式
    const echartsUpdateHandle = (dataset: any) => {
        if (chartFrame === ChartFrameEnum.ECHARTS) {
            // if (vChartRef.value) {
            //     setOption(vChartRef.value, { dataset: dataset })
            // }
            // if(!dataset.dimensions) return
            if(targetComponent.option){
                const SingleDataArr = [
                    CurrentSourceEnum.SINGLEPOINT
                ]
                const currentSource = targetComponent.commonData?.currentSource
                // 多个值的处理方式
                if(SingleDataArr.every(_ => _ !== currentSource)) {
                    let seriesItem = cloneDeep(targetComponent.option.series[0])
                    let series = []
                    if(dataset.dimensions.length - 1) {
                        for(let i = 0; i < dataset.dimensions.length - 1; i++) {
                            series.push(cloneDeep(seriesItem))
                        }
                    }
                    else {
                        series = [seriesItem]
                    }
                    if (vChartRef.value) {
                        Object.assign(targetComponent.option, {
                            series,
                            dataset,
                        })
                        setOption(vChartRef.value, { series, dataset })
                    }
                }
                else if(SingleDataArr.some(_ => _ === currentSource)) { // 单个值的处理
                    const targetObj = targetComponent.commonData[currentSource] as { result: resultType }
                    stopWatch = true
                    targetObj.result = dataset
                    setTimeout(() => {
                        stopWatch = false
                    }, 500)
                }
            }
        }
    }
    let stopWatch = false
    const requestIntervalFn = () => {
        const chartEditStore = useChartEditStore()

        // 全局数据
        const {
            requestIntervalUnit: globalUnit,
            requestInterval: globalRequestInterval
        } = toRefs(chartEditStore.getRequestGlobalConfig)

        // 目标组件
        const {
            requestIntervalUnit: targetUnit,
            requestInterval: targetInterval
        } = toRefs(targetComponent.request)

        try {
            clearInterval(fetchInterval)

            const fetchFn = async () => {
                let res
                switch (targetComponent.commonData?.currentSource) {
                    case CurrentSourceEnum.POINTHISTORY:
                        res = await handlePointHistory(targetComponent)
                        break;
                    case CurrentSourceEnum.ENERGYUSEHISTORY:
                        res = await handleEnergyUseHistory(targetComponent)
                        break;
                    case CurrentSourceEnum.RECORDVALUEHISTORY:
                        res = await handleRecordValueHistory(targetComponent)
                        break;
                    case CurrentSourceEnum.POINTREALTIME:
                        res = await handlePointRealTime(targetComponent)
                        break;
                    case CurrentSourceEnum.SINGLEPOINT:
                        res = await handleSinglePoint(targetComponent)
                        break;
                    default:
                        break;
                }
                if (res && res.errcode === ResultErrcode.SUCCESS) {
                    try {
                        const { data } = res
                        if(Object.prototype.toString.call(data) === '[object Array]') {
                            if(data.length) echartsUpdateHandle(data[0])
                        }
                        else if(Object.prototype.toString.call(data) === '[object Object]'){
                            echartsUpdateHandle(data)
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
                else if(res && res.errmsg){
                    window['$message'].warning(res.errmsg)
                }
            }
            // 普通初始化与组件交互处理监听
            watch(
                () => targetComponent.commonData,
                () => {
                    if(stopWatch) return
                    fetchFn()
                },
                {
                    immediate: true,
                    deep: true
                }
            )
            // 定时时间
            const time = targetInterval && targetInterval.value ? targetInterval.value : globalRequestInterval.value
            // 单位
            const unit = targetInterval && targetInterval.value ? targetUnit.value : globalUnit.value
            // 开启轮询
            if (time) {
                fetchInterval = setInterval(fetchFn, intervalUnitHandle(time, unit))
            } else {
                fetchFn()
            }
        } catch (error) {
            console.log(error)
        }
    }
    requestIntervalFn()
    if(!isPreview()) {
        clearInterval(fetchInterval)
    }
    return { vChartRef }
}
