import { DateTypeEnum, MethodsTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

type DateOptionsItemType = {
    label: string,
    value: DateTypeEnum,
    // duration: number
}
export const DateOptions: DateOptionsItemType[] = [
    {
        label: '近一天',
        value: DateTypeEnum.DAY,
        // 颗粒度为 秒数
        // duration: 60 * 60
    },
    {
        label: '近一月',
        value: DateTypeEnum.MONTH,
        // duration: 24 * 60 * 60
    },
    {
        label: '近一年',
        value: DateTypeEnum.YEAR,
        // duration: 30 * 24 * 60 * 60
    },
]
