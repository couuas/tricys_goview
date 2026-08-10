import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'

export const TricysBarChartConfig: ConfigType = {
    key: 'TricysBarChart',
    chartKey: 'VTricysBarChart',
    conKey: 'VCTricysBarChart',
    title: 'Tricys Bar Chart',
    category: 'Data',
    categoryName: '数据图',
    package: PackagesCategoryEnum.TRICYS,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'bar_x.png'
}
