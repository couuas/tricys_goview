import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TricysTimeSeriesConfig: ConfigType = {
    key: 'TricysTimeSeries',
    chartKey: 'VTricysTimeSeries',
    conKey: 'VCTricysTimeSeries',
    title: 'Tricys Time Series',
    category: ChatCategoryEnum.MORE, // Put in 'More' or a new category
    categoryName: ChatCategoryEnumName.MORE,
    package: PackagesCategoryEnum.CHARTS,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'line_chart.png' // Placeholder
}
