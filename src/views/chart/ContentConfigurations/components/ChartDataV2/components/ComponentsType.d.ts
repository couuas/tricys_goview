import { DateTypeEnum, MethodsTypeEnum, PolicyTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

type DateOptionsItemType = {
    label: string,
    value: DateTypeEnum,
    duration: number
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

type MethodsOptionsItemType = {
    label: string,
    value: MethodsTypeEnum
}
export const MethodsOptions: MethodsOptionsItemType[] = [
    {
        label: '平均值',
        value: MethodsTypeEnum.AVG
    },
    {
        label: '最小值',
        value: MethodsTypeEnum.MIN
    },
    {
        label: '最大值',
        value: MethodsTypeEnum.MAX
    }
]

type PolicyOptionsItemType = {
    label: string,
    value: PolicyTypeEnum
}

export const PolicyOptions: PolicyOptionsItemType[] = [
    {
        label: '平均值',
        value: PolicyTypeEnum.AVG
    },
    {
        label: '最小值',
        value: PolicyTypeEnum.MIN
    },
    {
        label: '最大值',
        value: PolicyTypeEnum.MAX
    }
]