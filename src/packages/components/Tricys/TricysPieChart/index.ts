import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'

export const TricysPieChartConfig: ConfigType = {
    key: 'TricysPieChart',
    chartKey: 'VTricysPieChart',
    conKey: 'VCTricysPieChart',
    title: 'Tricys Pie Chart',
    category: 'Data',
    categoryName: '数据图',
    package: PackagesCategoryEnum.TRICYS,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'pie.png'
}
