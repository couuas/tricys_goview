import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const LineWithDataZoomConfig: ConfigType = {
    key: 'LineWithDataZoom',
    chartKey: 'VLineWithDataZoom',
    conKey: 'VCLineWithDataZoom',
    title: '区域缩放折线图',
    category: ChatCategoryEnum.LINE,
    categoryName: ChatCategoryEnumName.LINE,
    package: PackagesCategoryEnum.CHARTS,
    chartFrame: ChartFrameEnum.ECHARTS,
    image: 'line_with_data_zoom.png'
}
