import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TricysMetricsConfig: ConfigType = {
    key: 'TricysMetrics',
    chartKey: 'VTricysMetrics',
    conKey: 'VCTricysMetrics',
    title: 'Tricys Metrics',
    category: ChatCategoryEnum.MORE,
    categoryName: ChatCategoryEnumName.MORE,
    package: PackagesCategoryEnum.INFORMATIONS,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'info.png' // Placeholder
}
