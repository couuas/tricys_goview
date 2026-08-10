import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'

export const TricysTimeSeriesConfig: ConfigType = {
    key: 'TricysTimeSeries',
    chartKey: 'VTricysTimeSeries',
    conKey: 'VCTricysTimeSeries',
    title: 'Tricys Time Series',
    category: 'Data',
    categoryName: '数据图',
    package: PackagesCategoryEnum.TRICYS,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'line.png'
}
